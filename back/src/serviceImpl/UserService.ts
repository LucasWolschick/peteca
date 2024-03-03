import { Token, User } from "@prisma/client";
import { UserRepository } from "../repository/UsuarioRepository";
import * as crypto from "crypto";
import * as bcrypt from "bcrypt";
import { TokenRepository } from "../repository/TokenRepository";
import RepositoryService from "./RepositoryService";

export class UserService {
  private userRepository: UserRepository;
  private tokenRepository: TokenRepository;

  constructor() {
    this.userRepository = RepositoryService.getUserRepository();
    this.tokenRepository = RepositoryService.getTokenRepository();
  }

  async register(user: Omit<User, "id">): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.senha, salt);

    user.senha = hashedPassword;

    return this.userRepository.create(user);
  }

  async getUserByToken(token: string): Promise<User | null> {
    const user = await this.userRepository.findByToken(token);

    if (!user) {
      throw new Error("Usuario nao encontrado");
    }

    return user;
  }

  async loginToken(
    email: string,
    password: string,
    remember: boolean
  ): Promise<{ user: User; token: Token }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuario nao encontrado");
    }

    const validPassword = await bcrypt.compare(password, user.senha);

    if (!validPassword) {
      throw new Error("Usuario nao encontrado");
    }

    const duration = remember ? 1000 * 60 * 60 * 24 * 30 : 1000 * 60 * 60 * 24;
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
}
