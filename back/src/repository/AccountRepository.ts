import { Conta, PrismaClient } from "@prisma/client";

class AccountRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createAccount({
    nome,
    descricao,
  }: {
    nome: string;
    descricao: string;
  }): Promise<Conta> {
    const acc = await this.prisma.conta.create({
      data: {
        nome,
        descricao,
        saldo: 0,
      },
    });
    return acc;
  }

  async getAccounts(): Promise<Conta[]> {
    return this.prisma.conta.findMany({ where: { ativo: true } });
  }

  async findById(id: number): Promise<Conta | null> {
    return this.prisma.conta.findUnique({
      where: {
        id,
        ativo: true,
      },
    });
  }

  async updateAccount(
    id: number,
    { nome, descricao }: { nome: string; descricao: string }
  ): Promise<Conta> {
    return this.prisma.conta.update({
      where: {
        id,
        ativo: true,
      },
      data: {
        nome,
        descricao,
      },
    });
  }

  async deleteAccount(id: number): Promise<Conta> {
    return this.prisma.conta.update({
      where: {
        id,
        ativo: true,
      },
      data: {
        ativo: false,
      },
    });
  }
}

export default AccountRepository;
