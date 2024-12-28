import Decimal from "decimal.js";
import { TransactionChangeRepository } from "../repository/TransactionChangeRepository";
import { TransactionRepository } from "../repository/TransactionRepository";
import RepositoryService from "./RepositoryService";
import { Conta, TipoTransacao, Transacao, User } from "@prisma/client";
import logger from "../logger";
import { NotFoundError } from "../errors";
import { ServiceManager } from "./ServiceManager";

export class TransactionService {
  private transactionRepository: TransactionRepository;
  private transactionChangeRepository: TransactionChangeRepository;

  constructor() {
    this.transactionRepository = RepositoryService.getTransactionRepository();
    this.transactionChangeRepository =
      RepositoryService.getTransactionChangeRepository();
  }

  async createTransaction(
    valor: Decimal,
    data: Date,
    referencia: string,
    tipo: TipoTransacao,
    conta: Conta,
    autor?: User
  ): Promise<Transacao> {
    logger.info(
      `Criando transação ${referencia} (valor=${valor}) para conta ${conta.nome}, tipo ${tipo}, data ${data}`
    );

    const transaction = await this.transactionRepository.createTransaction(
      valor,
      data,
      referencia,
      tipo,
      conta
    );

    if (autor) {
      await this.transactionChangeRepository.createTransaction(
        transaction,
        autor
      );
    }

    await ServiceManager.getAccountService().updateAddingTransaction(
      transaction
    );

    return transaction;
  }

  async getTransactionById(id: number): Promise<Transacao | null> {
    return await this.transactionRepository.findById(id);
  }

  async getTransactions(): Promise<Transacao[]> {
    return await this.transactionRepository.getTransactions();
  }

  async deleteTransaction(id: number, autor?: User) {
    const exists = await this.transactionRepository.findById(id);
    if (!exists) {
      throw new NotFoundError(`Transação com id ${id} não encontrada`);
    }

    logger.info(`Deletando transação com id ${id}`);
    const trans = await this.transactionRepository.deleteTransaction(id);

    if (autor) {
      await this.transactionChangeRepository.deleteTransaction(exists, autor);
    }

    await ServiceManager.getAccountService().updateDeletingTransaction(trans);
  }

  async updateTransaction(
    id: number,
    autor: User,
    {
      valor,
      data,
      referencia,
      tipo,
      conta,
    }: {
      valor?: Decimal;
      data?: Date;
      referencia?: string;
      tipo?: TipoTransacao;
      conta?: Conta;
    }
  ) {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new NotFoundError(`Transação com id ${id} não encontrada`);
    }

    logger.info(`Atualizando transação com id ${id}`);

    const updatedFields = { ...transaction };
    if (valor !== undefined) {
      updatedFields.valor = valor;
    }
    if (data !== undefined) {
      updatedFields.data = data;
    }
    if (referencia !== undefined) {
      updatedFields.referencia = referencia;
    }
    if (tipo !== undefined) {
      updatedFields.tipo = tipo;
    }
    if (conta !== undefined) {
      updatedFields.contaId = conta.id;
    }

    const updatedTransaction =
      await this.transactionRepository.updateTransaction(id, updatedFields);

    if (autor) {
      await this.transactionChangeRepository.updateTransaction(
        autor,
        transaction,
        updatedTransaction
      );
    }

    await ServiceManager.getAccountService().updateChangingTransaction(
      transaction,
      updatedTransaction
    );

    return updatedTransaction;
  }

  async searchTransactions(
    query?: string,
    from?: Date,
    to?: Date
  ): Promise<Transacao[]> {
    if (!query && !from && !to) {
      return await this.transactionRepository.getTransactions();
    }

    if (!from && !to) {
      // query only
      return await this.transactionRepository.getTransactionsByQuery(query);
    }

    from = from || new Date(0);
    to = to || new Date();

    if (!query) {
      return await this.transactionRepository.getTransactionsBetweenDates(
        from,
        to
      );
    } else {
      return await this.transactionRepository.getTransactionsByQueryAndDates(
        query,
        from,
        to
      );
    }
  }
}
