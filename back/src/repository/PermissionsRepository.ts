import { PrismaClient, Permissoes } from "@prisma/client";

export class PermissionsRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getPermissions(userId: number): Promise<string[]> {
    return (
      await this.prisma.userPermissoes.findMany({
        where: {
          userId: userId,
        },
        include: {
          permissao: {
            select: {
              nome: true,
            },
          },
        },
      })
    ).map((p) => p.permissao.nome);
  }

  async getAllPermissions(): Promise<string[]> {
    return (await this.prisma.permissoes.findMany()).map((p) => p.nome);
  }

  async hasPermission(userId: number, permission: string): Promise<boolean> {
    return (await this.getPermissions(userId)).includes(permission);
  }

  async grantPermission(userId: number, permission: string): Promise<void> {
    // grab permission id
    const perm = (
      await this.prisma.permissoes.findFirst({
        where: {
          nome: permission,
        },
      })
    ).id;

    // add entry to userPermissoes
    await this.prisma.userPermissoes.create({
      data: {
        userId: userId,
        permissaoId: perm,
      },
    });
  }

  async revokePermission(userId: number, permission: string): Promise<void> {
    await this.prisma.userPermissoes.deleteMany({
      where: {
        userId: userId,
        permissao: {
          nome: permission,
        },
      },
    });
  }
}
