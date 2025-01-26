import { Conta, TipoTransacao, Transacao, User } from "@prisma/client";
import { AccountChangeRepository } from "../repository/AccountChangeRepository";
import { AccountRepository } from "../repository/AccountRepository";
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

  async getAccountById(id: number): Promise<Conta> {
    const acc = await this.accountRepository.findById(id);
    if (!acc) {
      throw new NotFoundError(`Conta com id ${id} não encontrada`);
    }

    return acc;
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
    const response = await this.accountRepository.deleteAccount(id);

    if (autor) {
      await this.accountChangeRepository.deleteAccount(response, autor);
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

  async updateAddingTransaction(transaction: Transacao) {
    const acc = await this.getAccountById(transaction.contaId);
    if (!acc) {
      throw new NotFoundError(
        `Conta com id ${transaction.contaId} não encontrada`
      );
    }

    logger.info(`Atualizando saldo da conta ${acc.nome}`);

    if (transaction.tipo === TipoTransacao.PENDENCIA) {
      return;
    }

    let newSaldo;
    if (transaction.tipo === TipoTransacao.RECEITA) {
      newSaldo = acc.saldo.add(transaction.valor);
    } else if (
      transaction.tipo === TipoTransacao.DESPESA ||
      transaction.tipo == TipoTransacao.PENDENCIA
    ) {
      newSaldo = acc.saldo.sub(transaction.valor);
    }

    await this.accountRepository.updateSaldo(acc.id, newSaldo);
  }

  async updateChangingTransaction(
    oldTransaction: Transacao,
    newTransaction: Transacao
  ) {
    const oldAcc = await this.getAccountById(oldTransaction.contaId);
    if (!oldAcc) {
      throw new NotFoundError(
        `Conta com id ${oldTransaction.contaId} não encontrada`
      );
    }

    let balance = oldAcc.saldo;
    if (oldTransaction.tipo === TipoTransacao.RECEITA) {
      balance = balance.sub(oldTransaction.valor);
    } else if (
      oldTransaction.tipo === TipoTransacao.DESPESA ||
      oldTransaction.tipo == TipoTransacao.PENDENCIA
    ) {
      balance = balance.add(oldTransaction.valor);
    }

    if (oldTransaction.contaId === newTransaction.contaId) {
      if (newTransaction.tipo === TipoTransacao.RECEITA) {
        balance = balance.add(newTransaction.valor);
      } else if (
        newTransaction.tipo === TipoTransacao.DESPESA ||
        oldTransaction.tipo == TipoTransacao.PENDENCIA
      ) {
        balance = balance.sub(newTransaction.valor);
      }
      await this.accountRepository.updateSaldo(oldAcc.id, balance);
    } else {
      // Save the old account balance
      await this.accountRepository.updateSaldo(oldAcc.id, balance);

      const newAcc = await this.getAccountById(newTransaction.contaId);
      if (!newAcc) {
        throw new NotFoundError(
          `Conta com id ${newTransaction.contaId} não encontrada`
        );
      }

      let newBalance = newAcc.saldo;
      if (newTransaction.tipo === TipoTransacao.RECEITA) {
        newBalance = newBalance.add(newTransaction.valor);
      } else if (
        newTransaction.tipo === TipoTransacao.DESPESA ||
        oldTransaction.tipo == TipoTransacao.PENDENCIA
      ) {
        newBalance = newBalance.sub(newTransaction.valor);
      }
      await this.accountRepository.updateSaldo(newAcc.id, newBalance);
    }
  }

  async updateDeletingTransaction(transaction: Transacao) {
    const acc = await this.getAccountById(transaction.contaId);
    if (!acc) {
      throw new NotFoundError(
        `Conta com id ${transaction.contaId} não encontrada`
      );
    }

    logger.info(`Atualizando saldo da conta ${acc.nome}`);

    if (transaction.tipo === TipoTransacao.PENDENCIA) {
      return;
    }

    let newSaldo;
    if (transaction.tipo === TipoTransacao.RECEITA) {
      newSaldo = acc.saldo.sub(transaction.valor);
    } else if (
      transaction.tipo === TipoTransacao.DESPESA ||
      transaction.tipo == TipoTransacao.PENDENCIA
    ) {
      newSaldo = acc.saldo.add(transaction.valor);
    }

    await this.accountRepository.updateSaldo(acc.id, newSaldo);
  }

  async getAccountLogs(id: number) {
    const conta = await this.getAccountById(id);
    if (!conta) {
      throw new NotFoundError(`Conta com id ${id} não encontrada`);
    }

    return this.accountChangeRepository.getAccountChanges(conta);
  }
}
