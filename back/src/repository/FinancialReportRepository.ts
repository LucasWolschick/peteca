import { PrismaClient, User } from "@prisma/client";

export class FinancialReportRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createFinancialReport({
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
    return this.prisma.relatorioCaixinha.create({
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

  async getFinancialReportById(id: number) {
    return this.prisma.relatorioCaixinha.findUnique({
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

  async getFinancialReportsInfo() {
    return this.prisma.relatorioCaixinha.findMany({
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
