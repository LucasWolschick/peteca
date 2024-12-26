import {
  AlteracaoTransacao,
  PrismaClient,
  TipoAlteracaoTransacao,
  Transacao,
  User,
} from "@prisma/client";

export class TransactionChangeRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createTransaction(
    transaction: Transacao,
    autor: User
  ): Promise<AlteracaoTransacao> {
    return await this.prisma.alteracaoTransacao.create({
      data: {
        data: new Date(),
        tipo: TipoAlteracaoTransacao.CRIADA,

        novoValor: transaction.valor,
        novaData: transaction.data,
        novaReferencia: transaction.referencia,
        novoTipo: transaction.tipo,

        novaConta: {
          connect: {
            id: transaction.contaId,
          },
        },

        transacao: {
          connect: transaction,
        },

        autor: {
          connect: autor,
        },
      },
    });
  }

  async updateTransaction(
    autor: User,
    oldTrans: Transacao,
    newTrans: Transacao
  ): Promise<AlteracaoTransacao> {
    return await this.prisma.alteracaoTransacao.create({
      data: {
        data: new Date(),
        tipo: TipoAlteracaoTransacao.EDITADA,

        antigoValor: oldTrans.valor,
        antigaData: oldTrans.data,
        antigaReferencia: oldTrans.referencia,
        antigoTipo: oldTrans.tipo,

        antigaConta: {
          connect: {
            id: oldTrans.contaId,
          },
        },

        novoValor: newTrans.valor,
        novaData: newTrans.data,
        novaReferencia: newTrans.referencia,
        novoTipo: newTrans.tipo,

        novaConta: {
          connect: {
            id: newTrans.contaId,
          },
        },

        transacao: {
          connect: newTrans,
        },

        autor: {
          connect: autor,
        },
      },
    });
  }

  async deleteTransaction(
    transaction: Transacao,
    autor: User
  ): Promise<AlteracaoTransacao> {
    return await this.prisma.alteracaoTransacao.create({
      data: {
        data: new Date(),
        tipo: TipoAlteracaoTransacao.REMOVIDA,

        antigoValor: transaction.valor,
        antigaData: transaction.data,
        antigaReferencia: transaction.referencia,
        antigoTipo: transaction.tipo,

        antigaConta: {
          connect: {
            id: transaction.contaId,
          },
        },

        transacao: {
          connect: transaction,
        },

        autor: {
          connect: autor,
        },
      },
    });
  }
}
