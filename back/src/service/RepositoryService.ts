import { TokenRepository } from "../repository/TokenRepository";
import { UserRepository } from "../repository/UserRepository";
import { PrismaClient } from "@prisma/client";

class RepositoryService {
  private tokenRepository: TokenRepository | null = null;
  private userRepository: UserRepository | null = null;
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getTokenRepository(): TokenRepository {
    if (!this.tokenRepository)
      this.tokenRepository = new TokenRepository(this.prisma);
    return this.tokenRepository;
  }

  getUserRepository(): UserRepository {
    if (!this.userRepository)
      this.userRepository = new UserRepository(this.prisma);
    return this.userRepository;
  }
}

export default new RepositoryService(new PrismaClient());
