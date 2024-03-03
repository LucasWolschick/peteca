import { PrismaClient, User } from "@prisma/client";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(user: Omit<User, "id">): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async findByToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        tokens: {
          some: {
            token,
            data_expiracao: {
              gte: new Date(),
            },
          },
        },
      },
    });
  }
}
