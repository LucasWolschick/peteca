import { Token, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

import { NotFoundError, UnauthorizedError } from "../errors";
import { TokenRepository } from "../repository/TokenRepository";
import { UserRepository } from "../repository/UserRepository";
import RepositoryService from "./RepositoryService";
import { ServiceManager } from "./ServiceManager";
import { env } from "process";
import { PermissionsRepository } from "../repository/PermissionsRepository";

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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.senha, salt);

    user.senha = hashedPassword;

    const createdUser = await this.userRepository.create(user);
    // TODO: handle already exists

    const token = jwt.sign(
      { email: createdUser.email, action: "confirm" },
      process.env.JWT_SECRET
    );

    await ServiceManager.getEmailService().sendMail(
      user.email,
      "Link de confirmação da sua conta no Peteca",
      `Seu token para confirmar a sua conta é: ${token}`
    );

    return createdUser;
  }

  async activateAccount(token: string): Promise<void> {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      email: string;
      action: string;
    };

    if (decoded.action !== "confirm") {
      throw new NotFoundError("Token inválido");
    }

    const user = await this.userRepository.findByEmail(decoded.email);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

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

    await this.userRepository.update(user.id, { senha: hashedPassword });
    await this.tokenRepository.deleteAllUserTokens(user.id);
  }

  async resetPasswordRequest(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const token = jwt.sign(
      { email: user.email, action: "reset" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await ServiceManager.getEmailService().sendMail(
      user.email,
      "Redefinição da sua senha no Peteca",
      `Seu token para redefinir a senha é: ${token}`
    );
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
        admin: true,
        ra: null,
        nome: "admin",
        senha: "",
      };

      admin = await this.userRepository.create(user);
    }

    if (!this.permissionsRepository.hasPermission(admin.id, "admin")) {
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

  async loginandredirect(email: string, password: string, remember: boolean) {
    const { user, token } =  await this.loginToken(email, password, remember);

    if (user.verificado) {
      return { user, token };
    } else {
      throw new UnauthorizedError("Usuário não verificado");
    }
  }
}
