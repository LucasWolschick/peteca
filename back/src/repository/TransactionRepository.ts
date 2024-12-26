import {
  Conta,
  PrismaClient,
  TipoTransacao,
  Transacao,
  User,
} from "@prisma/client";
import { Decimal } from "decimal.js";

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
    conta: Conta
  ): Promise<Transacao> {
    const transacao = await this.prisma.transacao.create({
      data: {
        valor,
        data,
        referencia,
        tipo,

        conta: {
          connect: conta,
        },
      },
    });
    return transacao;
  }

  async getTransactions(): Promise<Transacao[]> {
    return this.prisma.transacao.findMany({ where: { ativo: true } });
  }

  async findById(id: number): Promise<Transacao | null> {
    return this.prisma.transacao.findUnique({
      where: {
        id,
        ativo: true,
      },
    });
  }

  async getTransactionsBetweenDates(
    startDate: Date,
    endDate: Date
  ): Promise<Transacao[]> {
    return this.prisma.transacao.findMany({
      where: {
        data: {
          gte: startDate,
          lte: endDate,
        },
        ativo: true,
      },
    });
  }

  async updateTransaction(
    id: number,
    { valor, data, referencia, tipo, contaId }
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
}
