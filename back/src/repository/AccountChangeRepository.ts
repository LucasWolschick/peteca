import { Conta, PrismaClient, TipoAlteracaoConta, User } from "@prisma/client";

class AccountChangeRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createAccount(acc: Conta, criador: User) {
    return this.prisma.alteracaoConta.create({
      data: {
        tipo: TipoAlteracaoConta.CRIADA,
        data: new Date(),

        conta: {
          connect: acc,
        },
        autor: {
          connect: criador,
        },

        novoNome: acc.nome,
        novaDescricao: acc.descricao,
      },
    });
  }

  async deleteAccount(acc: Conta, deletor: User) {
    return this.prisma.alteracaoConta.create({
      data: {
        tipo: TipoAlteracaoConta.REMOVIDA,
        data: new Date(),

        conta: {
          connect: acc,
        },
        autor: {
          connect: deletor,
        },

        antigoNome: acc.nome,
        antigaDescricao: acc.descricao,
      },
    });
  }

  async updateAccount(autor: User, oldAcc: Conta, newAcc: Conta) {
    return this.prisma.alteracaoConta.create({
      data: {
        tipo: TipoAlteracaoConta.EDITADA,
        data: new Date(),

        conta: {
          connect: newAcc,
        },
        autor: {
          connect: autor,
        },

        antigoNome: oldAcc.nome,
        antigaDescricao: oldAcc.descricao,

        novoNome: newAcc.nome,
        novaDescricao: newAcc.descricao,
      },
    });
  }
}

export default AccountChangeRepository;