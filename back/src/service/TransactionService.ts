import Decimal from "decimal.js";
import * as Handlebars from "handlebars";
import * as fs from "fs/promises";

import {
  TransacaoAutor,
  TransactionRepository,
} from "../repository/TransactionRepository";
import RepositoryService from "./RepositoryService";
import { AlteracaoTransacao, Conta, TipoTransacao, User } from "@prisma/client";
import logger from "../logger";
import { NotFoundError } from "../errors";
import { ServiceManager } from "./ServiceManager";
import { FinancialReportRepository } from "../repository/FinancialReportRepository";

// Remove campos sensíveis do autor de algum objeto
function filterAuthor<T extends { autor?: Pick<User, "id" | "nome"> }>(
  data: T
): Omit<T, "autor"> & { autor?: Pick<User, "id" | "nome"> } {
  if (!data.autor) return data;
  const { autor, ...rest } = data;
  return {
    autor: {
      id: autor.id,
      nome: autor.nome,
    },
    ...rest,
  };
}

export class TransactionService {
  private transactionRepository: TransactionRepository;
  private financialReportRepository: FinancialReportRepository;

  constructor() {
    this.transactionRepository = RepositoryService.getTransactionRepository();
    this.financialReportRepository =
      RepositoryService.getFinancialReportRepository();
  }

  async createTransaction(
    valor: Decimal,
    data: Date,
    referencia: string,
    tipo: TipoTransacao,
    conta: Conta,
    autor: User
  ): Promise<TransacaoAutor> {
    logger.info(
      `Criando transação ${referencia} (valor=${valor}) para conta ${conta.nome}, tipo ${tipo}, data ${data}`
    );

    const transaction = await this.transactionRepository.createTransaction(
      valor,
      data,
      referencia,
      tipo,
      conta,
      autor
    );

    if (autor) {
      await this.transactionRepository.logCreateTransaction(transaction, autor);
    }

    await ServiceManager.getAccountService().updateAddingTransaction(
      transaction
    );

    return filterAuthor({ autor, ...transaction });
  }

  async getTransactionById(id: number): Promise<TransacaoAutor> {
    const trans = await this.transactionRepository.findByIdWithAuthor(id);
    if (!trans) {
      throw new NotFoundError(`Transação com id ${id} não encontrada`);
    }

    return filterAuthor(trans);
  }

  async getTransactions(): Promise<TransacaoAutor[]> {
    const result = await this.transactionRepository.getTransactionsWithAuthor();
    return result.map((t) => filterAuthor(t));
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

    return filterAuthor({ autor: creator, ...updatedTransaction });
  }

  async searchTransactions(
    query?: string,
    from?: Date,
    to?: Date
  ): Promise<TransacaoAutor[]> {
    if (!query && !from && !to) {
      return (await this.transactionRepository.getTransactionsWithAuthor()).map(
        (t) => filterAuthor(t)
      );
    }

    if (!from && !to) {
      // query only
      return (
        await this.transactionRepository.getTransactionsByQueryWithAuthor(query)
      ).map((t) => filterAuthor(t));
    }

    from = from || new Date(0);
    to = to || new Date();

    if (!query) {
      return (
        await this.transactionRepository.getTransactionsBetweenDatesWithAuthor(
          from,
          to
        )
      ).map((t) => filterAuthor(t));
    } else {
      return (
        await this.transactionRepository.getTransactionsByQueryAndDatesWithAuthor(
          query,
          from,
          to
        )
      ).map((t) => filterAuthor(t));
    }
  }

  async getTransactionLogs(id: number): Promise<AlteracaoTransacao[]> {
    const transaction = await this.getTransactionById(id);
    if (!transaction) {
      throw new NotFoundError(`Transação com id ${id} não encontrada`);
    }

    return await this.transactionRepository.getTransactionChanges(transaction);
  }

  async emitReport(from: Date, to: Date, author?: User) {
    // collect data
    const transactions =
      await this.transactionRepository.getTransactionsBetweenDatesWithAuthor(
        new Date(0), // min date
        to
      );

    let previousSum = new Decimal(0);

    type Entry = {
      description: string;
      subtotal: string;
      value: Decimal;
    };

    let receitas: Entry[] = [];
    let despesas: Entry[] = [];
    let pendencias: Entry[] = [];

    for (const t of transactions) {
      const lst: Entry[] =
        {
          [TipoTransacao.RECEITA]: receitas,
          [TipoTransacao.DESPESA]: despesas,
        }[t.tipo] || pendencias;
      if (t.data < from) {
        if (t.tipo === TipoTransacao.RECEITA) {
          previousSum = previousSum.plus(t.valor);
        } else {
          previousSum = previousSum.minus(t.valor);
        }
        continue;
      }
      lst.push({
        description: t.referencia || `Movimentação ${lst.length + 1}`,
        subtotal: "R$ " + t.valor.toFixed(2),
        // for math purposes
        value: t.valor,
      });
    }

    const totalReceitas = receitas.reduce(
      (acc, t) => acc.plus(t.value),
      new Decimal(0)
    );
    const totalDespesas = despesas.reduce(
      (acc, t) => acc.plus(t.value),
      new Decimal(0)
    );
    const totalPendencias = pendencias.reduce(
      (acc, t) => acc.plus(t.value),
      new Decimal(0)
    );

    const montanteFinal = {
      title: "Montante Final",
      items: [
        { description: "Receitas", subtotal: "R$ " + totalReceitas.toFixed(2) },
        { description: "Despesas", subtotal: "R$ " + totalDespesas.toFixed(2) },
        {
          description: "Total Anterior ao Período",
          subtotal: "R$ " + previousSum.toFixed(2),
        },
        {
          description: "Total Retirado (Depositado)",
          subtotal:
            "R$ " +
            totalReceitas
              .minus(totalDespesas)
              .minus(totalPendencias)
              .toFixed(2),
        },
      ],
      total:
        "R$ " +
        previousSum
          .plus(totalReceitas)
          .minus(totalDespesas)
          .plus(totalPendencias)
          .toFixed(2),
    };

    const sections = [
      {
        title: "Receitas",
        items: receitas,
        total: "R$ " + totalReceitas.toFixed(2),
      },
      {
        title: "Despesas",
        items: despesas,
        total: "R$ " + totalDespesas.toFixed(2),
      },
      {
        title: "Pendências",
        items: pendencias,
        total: "R$ " + totalPendencias.toFixed(2),
      },
      montanteFinal,
    ];

    const now = new Date();

    const data = {
      university: "Universidade Federal de Maringá - Centro de Tecnologia",
      time: now.toLocaleTimeString(),
      date: now.toLocaleDateString(),
      user: author?.nome || "(desconhecido)",
      from: from.toLocaleDateString(),
      to: to.toLocaleDateString(),
      sections,
    };

    // generate report
    const template = await fs.readFile(
      "src/templates/financial_report.hbs",
      "utf-8"
    );
    const compiled = Handlebars.compile(template);
    const string = compiled(data);

    // save to database
    const report = await this.financialReportRepository.createFinancialReport({
      emitDate: now,
      start: from,
      end: to,
      data: string,
      author,
    });

    // return report
    return report;
  }

  async getFinancialReport(id: number) {
    const report = await this.financialReportRepository.getFinancialReportById(
      id
    );
    if (!report) {
      throw new NotFoundError(`Relatório com id ${id} não encontrado`);
    }

    return report;
  }

  async getReportsInfo() {
    return await this.financialReportRepository.getFinancialReportsInfo();
  }
}
