import { PrismaClient, User } from "@prisma/client";

export class FinancialStatementRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createFinancialStatement({
    emitDate,
    start,
    end,
    data,
    author,
  }: {
    emitDate: Date;
    start: Date;
    end: Date;
    data: string;
    author?: User;
  }) {
    return this.prisma.extratoCaixinha.create({
      data: {
        data: emitDate,
        inicio: start,
        fim: end,
        relatorio: new TextEncoder().encode(data),
        autor: author ? { connect: author } : undefined,
      },
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  }

  async getFinancialStatementById(id: number) {
    return this.prisma.extratoCaixinha.findUnique({
      where: { id },
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  }

  async getFinancialStatementsInfo() {
    return this.prisma.extratoCaixinha.findMany({
      select: {
        id: true,
        data: true,
        inicio: true,
        fim: true,
        autor: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  }
}
