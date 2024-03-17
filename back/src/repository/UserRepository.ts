import { PrismaClient, User } from "@prisma/client";
import { ConflictError } from "../errors";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(user: Omit<User, "id">): Promise<User> {
    // TODO: email já existe mas usuário desativado
    if (await this.prisma.user.findFirst({ where: { email: user.email } })) {
      throw new ConflictError("Usuário já existe");
    }
    return this.prisma.user.create({ data: user });
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id, ativo: true }, data: user });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { email, ativo: true } });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { id, ativo: true } });
  }

  async findByToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        ativo: true,
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

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({ where: { ativo: true } });
  }

  async DataExists(
    email: string,
    ra?: string,
    matricula?: string
  ): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: email, ra: ra },
          { email: email, matricula: matricula },
        ],
        ativo: true,
      },
    });
    return !!user;
  }

  async DeleteUserPermissions(id: number): Promise<void> {
    await this.prisma.userPermissoes.deleteMany({ where: { userId: id } });
  }
  async DeleteUserById(id: number): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: { ativo: false } });
  }
}
