import { AxiosResponse } from "axios";
import { api } from "./configs/axiosConfigs";
import Decimal from "decimal.js";

export type Conta = {
  id: number;
  nome: string;
  descricao: string;
  saldo: Decimal;
};

export type TipoAlteracaoConta = "CRIADA" | "REMOVIDA" | "EDITADA";

export type AlteracaoConta = {
  id: number;
  data: Date;
  antigoNome: string | null;
  antigaDescricao: string | null;
  novoNome: string | null;
  novaDescricao: string | null;
  tipo: TipoAlteracaoConta;
  contaId: number;
  autorId: number;
};

export const accountAPI = {
  getAccounts: async function (): Promise<Conta[]> {
    return await api.request({
      url: `/api/accounts`,
      method: "GET",
    });
  },

  criar: async function (
    nome: string,
    descricao: string
  ): Promise<AxiosResponse<Conta[]>> {
    return await api.request({
      url: `/api/accounts/create`,
      method: "POST",
      data: {
        nome,
        descricao,
      },
    });
  },

  getAccountLogs: async function (
    id: number
  ): Promise<AxiosResponse<AlteracaoConta[]>> {
    return await api.request({
      url: `/api/accounts/${id}/logs`,
      method: "GET",
    });
  },

  getAccount: async function (id: number): Promise<AxiosResponse<Conta>> {
    return await api.request({
      url: `/api/accounts/${id}`,
      method: "GET",
    });
  },

  updateAccount: async function (
    id: number,
    nome: string,
    descricao: string
  ): Promise<AxiosResponse<Conta>> {
    return await api.request({
      url: `/api/accounts/${id}`,
      method: "PUT",
      data: {
        nome,
        descricao,
      },
    });
  },

  deleteAccount: async function (id: number): Promise<AxiosResponse<{}>> {
    return await api.request({
      url: `/api/accounts/${id}`,
      method: "DELETE",
    });
  },
};
