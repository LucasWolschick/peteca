import { Token, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

import { ConflictError, NotFoundError, UnauthorizedError } from "../errors";
import { TokenRepository } from "../repository/TokenRepository";
import { UserRepository } from "../repository/UserRepository";
import RepositoryService from "./RepositoryService";
import { ServiceManager } from "./ServiceManager";
import { env } from "process";
import { PermissionsRepository } from "../repository/PermissionsRepository";
import logger from "../logger";

const ONE_DAY = 1000 * 60 * 60 * 24;
const THIRTY_DAYS = 30 * ONE_DAY;

export class UserService {
  private userRepository: UserRepository;
  private tokenRepository: TokenRepository;
  private permissionsRepository: PermissionsRepository;

  constructor() {
    this.userRepository = RepositoryService.getUserRepository();
    this.tokenRepository = RepositoryService.getTokenRepository();
    this.permissionsRepository = RepositoryService.getPermissionRepository();
  }

  async register(user: Omit<User, "id">): Promise<User> {
    // Verificar se o e-mail, ra ou matricula ja existe
    const existe = await this.userRepository.DataExists(
      user.email,
      user.ra,
      user.matricula
    );
    if (existe) {
      throw new ConflictError("E-mail, RA ou Matricula já existem");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.senha, salt);

    user.senha = hashedPassword;

    const createdUser = await this.userRepository.create(user);
    const token = jwt.sign(
      { email: createdUser.email, action: "confirm" },
      process.env.JWT_SECRET
    );
    logger.info(`Usuário novo cadastrado: ${createdUser.email}`);

    await ServiceManager.getEmailService().sendMail(
      user.email,
      "Link de confirmação da sua conta no Peteca",
      `Acesse o link para ativar sua conta no Peteca: ${env.BASE_URL}/login/email_confirmed/${token}`
    );

    return createdUser;
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const existe = await this.userRepository.DataExists(
      user.email,
      user.ra,
      user.matricula
    );
    if (!existe) {
      throw new NotFoundError("Usuário não encontrado");
    }
    delete user.id;
    return await this.userRepository.update(id, user);
  }

  async activateAccount(token: string): Promise<void> {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      email: string;
      action: string;
    };

    if (decoded.action !== "confirm") {
      logger.warn(`Tentativa de ativar conta com token inválido: ${token}`);
      throw new NotFoundError("Token inválido");
    }

    const user = await this.userRepository.findByEmail(decoded.email);

    if (!user) {
      logger.warn(
        `Tentativa de ativar conta com email não encontrado: ${token}`
      );
      throw new NotFoundError("Usuário não encontrado");
    }

    logger.info(`Ativando conta de: ${user.email}`);
    await this.userRepository.update(user.id, { verificado: true });
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      email: string;
      action: string;
    };

    if (decoded.action !== "reset") {
      throw new NotFoundError("Token inválido");
    }

    const user = await this.userRepository.findByEmail(decoded.email);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.userRepository.update(user.id, {
      senha: hashedPassword,
      senha_removida: false,
    });
    await this.tokenRepository.deleteAllUserTokens(user.id);
    logger.info(`Senha redefinida para: ${user.email}`);
  }

  async resetPasswordRequest(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      logger.warn(
        `Tentativa de redefinir senha de usuário não existente: ${email}`
      );
      throw new NotFoundError("Usuário não encontrado");
    }

    const token = jwt.sign(
      { email: user.email, action: "reset" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    logger.info(`Enviando email para redefinir senha de: ${user.email}`);
    await ServiceManager.getEmailService().sendMail(
      user.email,
      "Redefinição da sua senha no Peteca",
      `Seu link para redefinir a senha é: ${env.BASE_URL}/login/redefine_password/${token}`
    );
  }

  async hasPassword(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    return !user.senha_removida;
  }

  async loginToken(
    email: string,
    password: string,
    remember: boolean
  ): Promise<{ user: User; token: Token }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const validPassword = await bcrypt.compare(password, user.senha);

    if (!validPassword) {
      throw new NotFoundError("Usuário não encontrado");
    }

    if (!user.verificado) {
      throw new UnauthorizedError("Usuário não verificado");
    }

    const duration = remember ? THIRTY_DAYS : ONE_DAY;
    const now = new Date();
    const date = new Date(now.getTime() + duration);

    const tok: Omit<Token, "id"> = {
      token: crypto.randomBytes(64).toString("hex"),
      userId: user.id,
      data_expiracao: date,
    };

    const token = await this.tokenRepository.create(tok);
    return { user, token };
  }

  async authenticate(token: string): Promise<User> {
    const user = await this.userRepository.findByToken(token);

    if (!user) {
      logger.warn(`Usuário não autenticado com token: ${token}`);
      throw new UnauthorizedError("Usuário não autenticado");
    }

    return user;
  }

  async createAdmin() {
    let admin = await this.userRepository.findByEmail(env.EMAIL_USER);

    if (!admin) {
      const user: Omit<User, "id"> = {
        ativo: true,
        verificado: true,
        data_nascimento: new Date(),
        email: env.EMAIL_USER,
        imagem: "",
        ingresso: new Date(),
        matricula: "admin",
        ra: null,
        nome: "admin",
        senha: "",
        senha_removida: false,
      };
      logger.info(`Administrador não encontrado, criando um novo`);
      admin = await this.userRepository.create(user);
    }

    if (!(await this.permissionsRepository.hasPermission(admin.id, "admin"))) {
      logger.info(`Administrador não tem permissão de admin, concedendo`);
      await this.permissionsRepository.grantPermission(admin.id, "admin");
    }
  }

  async updateAdminPassword() {
    const admin = await this.userRepository.findByEmail(env.EMAIL_USER);

    if (admin === null) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(env.SENHA_ADMIN, salt);

    await this.userRepository.update(admin.id, { senha: hashedPassword });
  }

  async loginAndRedirect(email: string, password: string, remember: boolean) {
    const { user, token } = await this.loginToken(email, password, remember);

    if (user.verificado) {
      logger.info(`Login de: ${user.email}`);
      return { user, token };
    } else {
      logger.info(`Login de: ${user.email} falhou: não verificado`);
      throw new UnauthorizedError("Usuário não verificado");
    }
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    logger.info(`Removendo usuário com id ${id}`);

    await this.userRepository.DeleteUserPermissions(user.id);
    await this.tokenRepository.deleteAllUserTokens(user.id);
    await this.userRepository.DeleteUserById(user.id);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async logout(user: User): Promise<void> {
    await this.tokenRepository.deleteAllUserTokens(user.id);
  }
}
