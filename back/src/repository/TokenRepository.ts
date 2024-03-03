import { PrismaClient, Token } from "@prisma/client";

export class TokenRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(token: Omit<Token, "id">): Promise<Token> {
    return this.prisma.token.create({ data: token });
  }

  async findByToken(token: string): Promise<Token | null> {
    return this.prisma.token.findFirst({ where: { token } });
  }

  async delete(token: string) {
    return this.prisma.token.deleteMany({ where: { token } });
  }

  async deleteAllUserTokens(userId: number) {
    return this.prisma.token.deleteMany({ where: { userId } });
  }
}
