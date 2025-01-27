import {
  AlteracaoTransacao,
  Conta,
  PrismaClient,
  TipoAlteracaoTransacao,
  TipoTransacao,
  Transacao,
  User,
} from "@prisma/client";
import { Decimal } from "decimal.js";

export interface TransacaoAutor extends Transacao {
  autor?: Pick<User, "id" | "nome">;
}

export class TransactionRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createTransaction(
    valor: Decimal,
    data: Date,
    referencia: string,
    tipo: TipoTransacao,
    conta: Conta,
    autor: User
  ): Promise<Transacao> {
    return this.prisma.$transaction(async (tx) => {
      // Criação da transação
      const transacao = await tx.transacao.create({
        data: {
          valor,
          data,
          referencia,
          tipo,
          conta: {
            connect: { id: conta.id },
          },
          ativo: true,
        },
      });

      // Criação da alteração associada à transação
      await tx.alteracaoTransacao.create({
        data: {
          data: new Date(),
          tipo: TipoAlteracaoTransacao.CRIADA,
          transacao: {
            connect: { id: transacao.id },
          },
          autor: {
            connect: { id: autor.id },
          },
          novoValor: valor,
          novaData: data,
          novaReferencia: referencia,
          novoTipo: tipo,
          novaConta: {
            connect: { id: conta.id },
          },
        },
      });

      return transacao;
    });
  }

  async getTransactions(): Promise<Transacao[]> {
    return this.prisma.transacao.findMany({ where: { ativo: true } });
  }

  async getTransactionsWithAuthor(): Promise<TransacaoAutor[]> {
    console.log("Buscando transações com autor...");
    const result = await this.prisma.transacao.findMany();
    console.log("Todas as transações encontradas (sem filtros):", result);

    const filteredResult = await this.prisma.transacao.findMany({
      where: {
        ativo: true,
        // alteracaoTransacao: {
        //   some: {
        //     tipo: TipoAlteracaoTransacao.CRIADA,
        //   },
        // },
      },
      include: {
        alteracaoTransacao: {
          where: {
            tipo: TipoAlteracaoTransacao.CRIADA,
          },
          take: 1,
          include: {
            autor: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
    });

    console.log("Transações após aplicar filtros:", filteredResult);
    return filteredResult.map((transaction) => {
      const { alteracaoTransacao, ...rest } = transaction;
      return {
        ...rest,
        autor: alteracaoTransacao[0]?.autor,
      };
    });
  }

  async findByAccountId(accountId: number): Promise<Transacao[]> {
    return this.prisma.transacao.findMany({
      where: {
        contaId: accountId,
        ativo: true,
      },
    });
  }

  async findById(id: number): Promise<Transacao | null> {
    return this.prisma.transacao.findUnique({
      where: {
        id,
        ativo: true,
      },
    });
  }

  async findByIdWithAuthor(id: number): Promise<TransacaoAutor | null> {
    const transactionWithAuthorData = await this.prisma.transacao.findUnique({
      where: {
        id,
        ativo: true,
        // alteracaoTransacao: {
        //   some: {
        //     tipo: TipoAlteracaoTransacao.CRIADA,
        //   },
        // },
      },
      include: {
        alteracaoTransacao: {
          where: {
            tipo: TipoAlteracaoTransacao.CRIADA,
          },
          take: 1,
          include: {
            autor: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
    });

    if (!transactionWithAuthorData) {
      return null;
    }

    const { alteracaoTransacao, ...rest } = transactionWithAuthorData;
    return {
      ...rest,
      autor: alteracaoTransacao[0]?.autor,
    };
  }

  async getTransactionsBetweenDatesWithAuthor(
    startDate: Date,
    endDate: Date
  ): Promise<TransacaoAutor[]> {
    const trans = await this.prisma.transacao.findMany({
      where: {
        data: {
          gte: startDate,
          lte: endDate,
        },
        ativo: true,
        // alteracaoTransacao: {
        //   some: {
        //     tipo: TipoAlteracaoTransacao.CRIADA,
        //   },
        // },
      },
      include: {
        alteracaoTransacao: {
          where: {
            tipo: TipoAlteracaoTransacao.CRIADA,
          },
          take: 1,
          include: {
            autor: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
    });

    return trans.map((transaction) => {
      const { alteracaoTransacao, ...rest } = transaction;
      return {
        ...rest,
        autor: alteracaoTransacao[0]?.autor,
      };
    });
  }

  async getTransactionsByQueryWithAuthor(
    query: string
  ): Promise<TransacaoAutor[]> {
    const trans = await this.prisma.transacao.findMany({
      where: {
        OR: [
          {
            referencia: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            conta: {
              nome: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
        ativo: true,
        // alteracaoTransacao: {
        //   some: {
        //     tipo: TipoAlteracaoTransacao.CRIADA,
        //   },
        // },
      },
      include: {
        alteracaoTransacao: {
          where: {
            tipo: TipoAlteracaoTransacao.CRIADA,
          },
          take: 1,
          include: {
            autor: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
    });

    return trans.map((transaction) => {
      const { alteracaoTransacao, ...rest } = transaction;
      return {
        ...rest,
        autor: alteracaoTransacao[0]?.autor,
      };
    });
  }

  async getTransactionsByQueryAndDatesWithAuthor(
    query: string,
    startDate: Date,
    endDate: Date
  ): Promise<TransacaoAutor[]> {
    const trans = await this.prisma.transacao.findMany({
      where: {
        data: {
          gte: startDate,
          lte: endDate,
        },
        // alteracaoTransacao: {
        //   some: {
        //     tipo: TipoAlteracaoTransacao.CRIADA,
        //   },
        // },
        OR: [
          {
            referencia: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            conta: {
              nome: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
        ativo: true,
      },
      include: {
        alteracaoTransacao: {
          where: {
            tipo: TipoAlteracaoTransacao.CRIADA,
          },
          take: 1,
          include: {
            autor: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
    });

    return trans.map((transaction) => {
      const { alteracaoTransacao, ...rest } = transaction;
      return {
        ...rest,
        autor: alteracaoTransacao[0]?.autor,
      };
    });
  }

  async updateTransaction(
    id: number,
    { valor, data, referencia, tipo, contaId }: Omit<Transacao, "id" | "ativo">
  ): Promise<Transacao> {
    return this.prisma.transacao.update({
      where: {
        id,
        ativo: true,
      },
      data: {
        valor,
        data,
        referencia,
        tipo,

        conta: {
          connect: {
            id: contaId,
          },
        },
      },
    });
  }

  async deleteTransaction(id: number): Promise<Transacao> {
    return this.prisma.transacao.update({
      where: {
        id,
        ativo: true,
      },
      data: {
        ativo: false,
      },
    });
  }

  // following methods were brought from TransactionChangeRepository
  async logCreateTransaction(
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

  async logUpdateTransaction(
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

  async logDeleteTransaction(
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

  async getTransactionChanges(
    transaction: Transacao
  ): Promise<AlteracaoTransacao[]> {
    return this.prisma.alteracaoTransacao.findMany({
      where: {
        transacaoId: transaction.id,
      },
      orderBy: {
        data: "desc",
      },
    });
  }
}
