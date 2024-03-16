import logger from "../logger";
import RepositoryService from "../service/RepositoryService";

export default class ItemService {
  static getItems() {
    throw new Error("Method not implemented.");
  }
  private itemRepository;

  constructor() {
    this.itemRepository = RepositoryService.getItemRepository();
  }

  async getItems() {
    return this.itemRepository.getItems();
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
    logger.info(`Atualizando itens ${itemsToUpdate}`);
    for (const item of itemsToUpdate) {
      const exists = await this.itemRepository.itemExists(item.id);
      if (!exists) {
        throw new Error(`Item com id ${item.id} não encontrado`);
      }
    }
    return this.itemRepository.updateItems(itemsToUpdate);
  }

  async getItemById(id: number) {
    const exists = await this.itemRepository.itemExists(id);
    if (!exists) {
      throw new Error(`Item com id ${id} não encontrado`);
    }
    return this.itemRepository.getItemById(id);
  }

  async deleteItem(id: number) {
    logger.info(`Removendo item com id ${id}`);
    const exists = await this.itemRepository.itemExists(id);
    if (!exists) {
      throw new Error(`Item com id ${id} não encontrado`);
    }
    return this.itemRepository.deleteItem(id);
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
    local: string
  ) {
    logger.info(
      `Criando item ${nome}, ${quantidade}, ${unidadeMedida}, ${local}`
    );
    return this.itemRepository.createItem(
      nome,
      quantidade,
      unidadeMedida,
      local
    );
  }
}
