import { AxiosResponse } from "axios";
import { api } from "./configs/axiosConfigs";
import { TipoTransacao } from "@prisma/client";
import Decimal from "decimal.js";

export type Transaction = {
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

export type UpdateTransactionDTO = Partial<{
  valor: number;
  data: Date;
  referencia: string;
  tipo: "receita" | "despesa" | "pendencia";
  conta: number;
}>;

export const transactionAPI = {
  getAll: async function (): Promise<AxiosResponse<Transaction[]>> {
    return await api.request({
      url: "/api/transaction",
      method: "GET",
    });
  },

  getFilter: async function (
    from?: Date,
    to?: Date,
    q?: string
  ): Promise<AxiosResponse<Transaction[]>> {
    const transactions = await api.request({
      url: `/api/transaction/filter`,
      method: "GET",
      params: { from, to, q },
    });

    transactions.data = transactions.data.map((transaction: Transaction) => ({
      ...transaction,
      data: new Date(transaction.data),
      valor: new Decimal(transaction.valor),
    }));

    return transactions;
  },

  getById: async function (id: number): Promise<AxiosResponse<Transaction>> {
    const response = await api.request({
      url: `/api/transaction/${id}`,
      method: "GET",
    });

    response.data.data = new Date(response.data.data);
    response.data.valor = new Decimal(response.data.valor);

    return response;
  },

  getLogs: async function (id: number): Promise<AxiosResponse<any[]>> {
    return await api.request({
      url: `/api/transaction/${id}/logs`,
      method: "GET",
    });
  },

  create: async function (
    data: CreateTransactionDTO
  ): Promise<AxiosResponse<Transaction>> {
    return await api.request({
      url: "/api/transaction/create",
      method: "POST",
      data,
    });
  },

  update: async function (
    id: number,
    data: UpdateTransactionDTO
  ): Promise<AxiosResponse<Transaction>> {
    return await api.request({
      url: `/api/transaction/${id}`,
      method: "PUT",
      data,
    });
  },

  delete: async function (id: number): Promise<AxiosResponse<void>> {
    return await api.request({
      url: `/api/transaction/${id}`,
      method: "DELETE",
    });
  },
};