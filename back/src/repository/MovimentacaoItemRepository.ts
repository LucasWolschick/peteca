import {
  Item,
  MovimentacaoItem,
  PrismaClient,
  TipoMovimentacaoItem,
  User,
} from "@prisma/client";

export class MovimentacaoItemRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createItem(item: Item, autor: User) {
    return await this.prisma.movimentacaoItem.create({
      data: {
        tipo: TipoMovimentacaoItem.CRIADO,
        data: new Date(),

        item: {
          connect: item,
        },
        autor: {
          connect: autor,
        },

        novaQuantidade: item.quantidade,
        novoNome: item.nome,
        novaUnidadeMedida: item.unidadeMedida,
        novoLocal: item.local,
      },
    });
  }

  async updateItems(
    autor: User,
    itemsToUpdate: {
      id: number;
      nome?: string;
      quantidade?: number;
      unidadeMedida?: string;
      local?: string;
    }[]
  ) {
    const oldItems = await this.prisma.item.findMany({
      where: {
        id: {
          in: itemsToUpdate.map((item) => item.id),
        },
      },
    });
    // make dictionary
    const oldItemsDict = oldItems.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
    const updatePromises = itemsToUpdate.map((item) => {
      const oldItem = oldItemsDict[item.id];
      return this.prisma.movimentacaoItem.create({
        data: {
          tipo: TipoMovimentacaoItem.ALTERADO,
          data: new Date(),

          item: {
            connect: { id: item.id },
          },
          autor: {
            connect: autor,
          },

          antigaQuantidade: item.quantidade ? oldItem.quantidade : undefined,
          antigoNome: item.nome ? oldItem.nome : undefined,
          antigaUnidadeMedida: item.unidadeMedida
            ? oldItem.unidadeMedida
            : undefined,
          antigoLocal: item.local ? oldItem.local : undefined,

          novaQuantidade: item.quantidade,
          novoNome: item.nome,
          novaUnidadeMedida: item.unidadeMedida,
          novoLocal: item.local,
        },
      });
    });

    return Promise.all(updatePromises);
  }

  async deleteItem(autor: User, item: Item) {
    return await this.prisma.movimentacaoItem.create({
      data: {
        tipo: TipoMovimentacaoItem.REMOVIDO,
        data: new Date(),

        item: {
          connect: item,
        },
        autor: {
          connect: autor,
        },

        antigaQuantidade: item.quantidade,
        antigoNome: item.nome,
        antigaUnidadeMedida: item.unidadeMedida,
        antigoLocal: item.local,
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
