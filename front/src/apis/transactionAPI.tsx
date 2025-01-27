import { AxiosResponse } from "axios";
import { api } from "./configs/axiosConfigs";
import Decimal from "decimal.js";

export type TipoTransacao = "RECEITA" | "DESPESA" | "PENDENCIA";

export type Transacao = {
  id: number;
  valor: Decimal;
  data: Date;
  referencia: string;
  tipo: TipoTransacao;
  conta: {
    id: number;
    nome: string;
  };
  criadoPor: {
    id: number;
    nome: string;
  };
};

export type CreateTransactionDTO = {
  valor: number;
  data: Date;
  referencia?: string;
  tipo: "receita" | "despesa" | "pendencia";
  conta: number;
};

export type UpdateTransactionDTO = Partial<CreateTransactionDTO>;

export type Report = {
  id: number;
  data: Date;
  inicio: Date;
  fim: Date;
  autor: {
    id: number;
    nome: string;
  };
};

export type Statement = Report;

export const transactionAPI = {
  getAll: async function (): Promise<AxiosResponse<Transacao[]>> {
    return await api.request({
      url: "/api/transactions",
      method: "GET",
    });
  },

  getFilter: async function (
    from?: Date,
    to?: Date,
    q?: string
  ): Promise<AxiosResponse<Transacao[]>> {
    const transactions = await api.request({
      url: `/api/transactions/filter`,
      method: "GET",
      params: { from, to, q },
    });

    transactions.data = transactions.data.map((transaction: Transacao) => ({
      ...transaction,
      data: new Date(transaction.data),
      valor: new Decimal(transaction.valor),
    }));

    return transactions;
  },

  getById: async function (id: number): Promise<AxiosResponse<Transacao>> {
    const response = await api.request({
      url: `/api/transactions/${id}`,
      method: "GET",
    });

    response.data.data = new Date(response.data.data);
    response.data.valor = new Decimal(response.data.valor);

    return response;
  },

  getLogs: async function (id: number): Promise<AxiosResponse<any[]>> {
    return await api.request({
      url: `/api/transactions/${id}/logs`,
      method: "GET",
    });
  },

  create: async function (
    data: CreateTransactionDTO
  ): Promise<AxiosResponse<Transacao>> {
    return await api.request({
      url: "/api/transactions/create",
      method: "POST",
      data,
    });
  },

  update: async function (
    id: number,
    data: UpdateTransactionDTO
  ): Promise<AxiosResponse<Transacao>> {
    return await api.request({
      url: `/api/transactions/${id}`,
      method: "PUT",
      data,
    });
  },

  delete: async function (id: number): Promise<AxiosResponse<void>> {
    return await api.request({
      url: `/api/transactions/${id}`,
      method: "DELETE",
    });
  },

  getReports: async function (): Promise<AxiosResponse<Report[]>> {
    const reports = await api.request({
      url: "/api/transactions/reports",
      method: "GET",
    });

    reports.data = reports.data.map((report: Report) => ({
      ...report,
      data: new Date(report.data),
      inicio: new Date(report.inicio),
      fim: new Date(report.fim),
    }));

    return reports;
  },

  createReport: async function (
    from: Date,
    to: Date
  ): Promise<AxiosResponse<string>> {
    const response = await api.request({
      url: "/api/transactions/reports/create",
      method: "POST",
      data: { from, to },
    });

    return response.headers.location;
  },

  getReportHtml: async function (id: number): Promise<AxiosResponse<string>> {
    return await api.request({
      url: `/api/transactions/reports/${id}`,
      method: "GET",
    });
  },

  getStatements: async function (): Promise<AxiosResponse<Statement[]>> {
    const statements = await api.request({
      url: "/api/transactions/statements",
      method: "GET",
    });

    statements.data = statements.data.map((statement: Statement) => ({
      ...statement,
      data: new Date(statement.data),
      inicio: new Date(statement.inicio),
      fim: new Date(statement.fim),
    }));

    return statements;
  },

  createStatement: async function (
    from?: Date,
    to?: Date,
    q?: string
  ): Promise<AxiosResponse<string>> {
    const response = await api.request({
      url: "/api/transactions/statements/create",
      method: "POST",
      data: { from, to, q },
    });

    return response.headers.location;
  },

  getStatementHtml: async function (
    id: number
  ): Promise<AxiosResponse<string>> {
    return await api.request({
      url: `/api/transactions/statements/${id}`,
      method: "GET",
    });
  },
};
