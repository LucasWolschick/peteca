import {
  MovimentacaoItem,
  PrismaClient,
  TipoMovimentacaoItem,
} from "@prisma/client";

export class ItemRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createItem(
    nome: string,
    quantidade: number,
    unidadeMedida: string,
    local: string
  ) {
    const item = await this.prisma.item.create({
      data: {
        nome,
        quantidade,
        unidadeMedida,
        local,
      },
    });

    return item;
  }

  async getItems() {
    return await this.prisma.item.findMany({ where: { ativo: true } });
  }

  async updateItems(
    itemsToUpdate: {
      id: number;
      nome?: string;
      quantidade?: number;
      unidadeMedida?: string;
      local?: string;
    }[]
  ) {
    const updatePromises = itemsToUpdate.map((item) => {
      return this.prisma.item.update({
        where: { id: item.id, ativo: true },
        data: {
          nome: item.nome,
          quantidade: item.quantidade,
          unidadeMedida: item.unidadeMedida,
          local: item.local,
        },
      });
    });

    return Promise.all(updatePromises);
  }

  async itemExists(id: number): Promise<boolean> {
    const item = await this.prisma.item.findUnique({
      where: { id, ativo: true },
    });
    return !!item;
  }

  async getItemById(id: number) {
    return this.prisma.item.findUnique({
      where: { id, ativo: true },
    });
  }

  async deleteItem(id: number) {
    return this.prisma.item.update({
      where: { id, ativo: true },
      data: {
        ativo: false,
      },
    });
  }

  async searchItems(searchParams: {
    nome?: string;
    quantidade?: number;
    unidadeMedida?: string;
    local?: string;
  }) {
    return this.prisma.item.findMany({
      where: {
        nome: searchParams.nome,
        quantidade: searchParams.quantidade,
        unidadeMedida: searchParams.unidadeMedida,
        local: searchParams.local,
        ativo: true,
      },
    });
  }

  async getLogs(from: Date, to: Date) {
    const x = await this.prisma.movimentacaoItem.findMany({
      where: {
        data: {
          gte: from,
          lte: to,
        },
      },
      include: {
        item: true,
        autor: {
          select: {
            nome: true,
            id: true,
          },
        },
      },
    });

    return x;
  }
}
