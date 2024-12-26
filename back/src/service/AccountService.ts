import { Conta, User } from "@prisma/client";
import AccountChangeRepository from "../repository/AccountChangeRepository";
import AccountRepository from "../repository/AccountRepository";
import RepositoryService from "./RepositoryService";
import logger from "../logger";
import { NotFoundError } from "../errors";

export class AccountService {
  private accountRepository: AccountRepository;
  private accountChangeRepository: AccountChangeRepository;

  constructor() {
    this.accountRepository = RepositoryService.getAccountRepository();
    this.accountChangeRepository =
      RepositoryService.getAccountChangeRepository();
  }

  async createAccount(
    nome: string,
    descricao: string,
    autor?: User
  ): Promise<Conta> {
    logger.info(`Criando conta ${nome} (desc="${descricao}")`);

    const acc = await this.accountRepository.createAccount({ nome, descricao });

    if (autor) {
      await this.accountChangeRepository.createAccount(acc, autor);
    }

    return acc;
  }

  async getAccountById(id: number): Promise<Conta | null> {
    return await this.accountRepository.findById(id);
  }

  async getAccounts(): Promise<Conta[]> {
    return await this.accountRepository.getAccounts();
  }

  async deleteAccount(id: number, autor?: User) {
    const exists = await this.accountRepository.findById(id);
    if (!exists) {
      throw new NotFoundError(`Conta com id ${id} não encontrada`);
    }

    logger.info(`Deletando conta com id ${id}`);
    await this.accountRepository.deleteAccount(id);

    if (autor) {
      await this.accountChangeRepository.deleteAccount(exists, autor);
    }
  }

  async updateAccount(
    id: number,
    nome: string,
    descricao: string,
    autor?: User
  ) {
    const acc = await this.accountRepository.findById(id);
    if (!acc) {
      throw new NotFoundError(`Conta com id ${id} não encontrada`);
    }

    logger.info(`Atualizando conta com id ${id}`);
    const newAcc = await this.accountRepository.updateAccount(id, {
      nome,
      descricao,
    });

    if (autor) {
      await this.accountChangeRepository.updateAccount(autor, acc, newAcc);
    }
  }
}
