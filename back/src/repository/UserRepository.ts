import { PrismaClient, User } from "@prisma/client";
import { ConflictError } from "../errors";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(user: Omit<User, "id">): Promise<User> {
    if (await this.prisma.user.findFirst({ where: { email: user.email } })) {
      throw new ConflictError("Usuário já existe");
    }
    return this.prisma.user.create({ data: user });
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: user });
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
