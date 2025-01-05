import Decimal from "decimal.js";
import {
  TransacaoAutor,
  TransactionRepository,
} from "../repository/TransactionRepository";
import RepositoryService from "./RepositoryService";
import { AlteracaoTransacao, Conta, TipoTransacao, User } from "@prisma/client";
import logger from "../logger";
import { NotFoundError } from "../errors";
import { ServiceManager } from "./ServiceManager";

export class TransactionService {
  private transactionRepository: TransactionRepository;

  constructor() {
    this.transactionRepository = RepositoryService.getTransactionRepository();
  }

  async createTransaction(
    valor: Decimal,
    data: Date,
    referencia: string,
    tipo: TipoTransacao,
    conta: Conta,
    autor?: User
  ): Promise<TransacaoAutor> {
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
      await this.transactionRepository.logCreateTransaction(transaction, autor);
    }

    await ServiceManager.getAccountService().updateAddingTransaction(
      transaction
    );

    return { autor, ...transaction };
  }

  async getTransactionById(id: number): Promise<TransacaoAutor | null> {
    return await this.transactionRepository.findByIdWithAuthor(id);
  }

  async getTransactions(): Promise<TransacaoAutor[]> {
    return await this.transactionRepository.getTransactionsWithAuthor();
  }

  async deleteTransaction(id: number, autor?: User) {
    const exists = await this.transactionRepository.findById(id);
    if (!exists) {
      throw new NotFoundError(`Transação com id ${id} não encontrada`);
    }

    logger.info(`Deletando transação com id ${id}`);
    const trans = await this.transactionRepository.deleteTransaction(id);

    if (autor) {
      await this.transactionRepository.logDeleteTransaction(exists, autor);
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
  ): Promise<TransacaoAutor> {
    const transaction = await this.transactionRepository.findByIdWithAuthor(id);
    if (!transaction) {
      throw new NotFoundError(`Transação com id ${id} não encontrada`);
    }

    logger.info(`Atualizando transação com id ${id}`);

    const { autor: creator, ...updatedFields } = transaction;
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
      await this.transactionRepository.logUpdateTransaction(
        autor,
        transaction,
        updatedTransaction
      );
    }

    await ServiceManager.getAccountService().updateChangingTransaction(
      transaction,
      updatedTransaction
    );

    return { autor: creator, ...updatedTransaction };
  }

  async searchTransactions(
    query?: string,
    from?: Date,
    to?: Date
  ): Promise<TransacaoAutor[]> {
    if (!query && !from && !to) {
      return await this.transactionRepository.getTransactionsWithAuthor();
    }

    if (!from && !to) {
      // query only
      return await this.transactionRepository.getTransactionsByQueryWithAuthor(
        query
      );
    }

    from = from || new Date(0);
    to = to || new Date();

    if (!query) {
      return await this.transactionRepository.getTransactionsBetweenDatesWithAuthor(
        from,
        to
      );
    } else {
      return await this.transactionRepository.getTransactionsByQueryAndDatesWithAuthor(
        query,
        from,
        to
      );
    }
  }

  async getTransactionLogs(id: number): Promise<AlteracaoTransacao[]> {
    const transaction = await this.getTransactionById(id);
    if (!transaction) {
      throw new NotFoundError(`Transação com id ${id} não encontrada`);
    }

    return await this.transactionRepository.getTransactionChanges(transaction);
  }
}
