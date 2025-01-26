import { Item, TipoMovimentacaoItem, User } from "@prisma/client";
import logger from "../logger";
import { ItemRepository } from "../repository/ItemRepository";
import RepositoryService from "../service/RepositoryService";
import { MovimentacaoItemRepository } from "../repository/MovimentacaoItemRepository";

export class ItemService {
  private itemRepository: ItemRepository;
  private movimentacaoItemRepository: MovimentacaoItemRepository;

  constructor() {
    this.itemRepository = RepositoryService.getItemRepository();
    this.movimentacaoItemRepository =
      RepositoryService.getMovimentacaoItemRepository();
  }

  async getItems() {
    return await this.itemRepository.getItems();
  }

  async updateItems(
    itemsToUpdate: {
      id: number;
      nome?: string;
      quantidade?: number;
      unidadeMedida?: string;
      local?: string;
    }[],
    autor?: User
  ) {
    logger.info(`Atualizando itens ${itemsToUpdate}`);
    for (const item of itemsToUpdate) {
      const exists = await this.itemRepository.itemExists(item.id);
      if (!exists) {
        throw new Error(`Item com id ${item.id} não encontrado`);
      }
    }
    if (autor) {
      this.movimentacaoItemRepository.updateItems(autor, itemsToUpdate);
    }
    const itens = this.itemRepository.updateItems(itemsToUpdate);
  }

  async getItemById(id: number) {
    const exists = await this.itemRepository.itemExists(id);
    if (!exists) {
      throw new Error(`Item com id ${id} não encontrado`);
    }
    return this.itemRepository.getItemById(id);
  }

  async deleteItem(id: number, autor?: User) {
    logger.info(`Removendo item com id ${id}`);
    const exists = await this.itemRepository.itemExists(id);
    if (!exists) {
      throw new Error(`Item com id ${id} não encontrado`);
    }
    const item = await this.itemRepository.deleteItem(id);
    if (autor) {
      await this.movimentacaoItemRepository.deleteItem(autor, item);
    }
  }

  async searchItems(searchParams: {
    nome?: string;
    quantidade?: number;
    unidadeMedida?: string;
    local?: string;
  }) {
    return this.itemRepository.searchItems(searchParams);
  }

  async createItem(
    nome: string,
    quantidade: number,
    unidadeMedida: string,
    local: string,
    autor?: User
  ) {
    logger.info(
      `Criando item ${nome}, ${quantidade}, ${unidadeMedida}, ${local}`
    );

    const item = await this.itemRepository.createItem(
      nome,
      quantidade,
      unidadeMedida,
      local
    );

    if (autor) {
      await this.movimentacaoItemRepository.createItem(item, autor);
    }

    return item;
  }

  async getLogs(from: Date, to: Date): Promise<any[]> {
    if (!from) {
      from = new Date(0);
    }

    if (!to) {
      to = new Date();
    }

    // map logs to list of item deltas (dicts)
    const logs = (await this.itemRepository.getLogs(from, to))
      // .filter((log) => from <= log.data && log.data <= to)
      .map((log) => {
        const tipo = log.tipo;

        let antigoItem, novoItem;
        if (tipo == TipoMovimentacaoItem.CRIADO) {
          antigoItem = null;
          novoItem = log.item;
        } else if (tipo == TipoMovimentacaoItem.ALTERADO) {
          antigoItem = log.item;
          if (log.antigoNome) antigoItem.nome = log.antigoNome;
          if (log.antigaQuantidade)
            antigoItem.quantidade = log.antigaQuantidade;
          if (log.antigaUnidadeMedida)
            antigoItem.unidadeMedida = log.antigaUnidadeMedida;
          if (log.antigoLocal) antigoItem.local = log.antigoLocal;

          novoItem = log.item;
          if (log.novoNome) novoItem.nome = log.novoNome;
          if (log.novaQuantidade) novoItem.quantidade = log.novaQuantidade;
          if (log.novaUnidadeMedida)
            novoItem.unidadeMedida = log.novaUnidadeMedida;
          if (log.novoLocal) novoItem.local = log.novoLocal;
        } else if (tipo == TipoMovimentacaoItem.REMOVIDO) {
          antigoItem = log.item;
          novoItem = null;
        }

        // computa diferenças entre antigo e novo item
        antigoItem = antigoItem ?? {};
        novoItem = novoItem ?? {};
        let keys: any = new Set([
          ...Object.keys(antigoItem),
          ...Object.keys(novoItem),
        ]);
        // convert to list
        keys = Array.from(keys);

        const delta = {};
        for (const key of keys) {
          if (antigoItem[key] != novoItem[key]) {
            delta[key] = [antigoItem[key], novoItem[key]];
          }
        }

        return {
          tipo: tipo.toString(),
          data: log.data,

          autor: log.autor,
          item: log.item,
          delta: delta,
        };
      });

    return logs;
  }
}
