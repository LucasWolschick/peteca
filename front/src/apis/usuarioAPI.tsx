import { AxiosResponse } from "axios";
import { api } from "./configs/axiosConfigs";

export interface User {
  id: number;
  ingresso: Date;
  nome: string;
  ra?: string;
  matricula?: string;
  email: string;
  verificado: boolean;
  data_nascimento: Date;
  imagem: string;
  ativo: boolean;
}

export interface Token {
  id: number;
  token: string;
  userId: number;
  data_expiracao: Date;
}

function parseUserResponse(user: any): User {
  const copy = { ...user };

  copy.id = Number(user.id);
  copy.ingresso = new Date(user.ingresso);
  copy.data_nascimento = new Date(user.data_nascimento);

  return copy;
}

function parseTokenResponse(token: any): Token {
  const copy = { ...token };

  copy.id = Number(token.id);
  copy.userId = Number(token.userId);
  copy.data_expiracao = new Date(token.data_expiracao);

  return copy;
}

export const UsuarioAPI = {
  register: async function (
    nome: string,
    email: string,
    senha: string,
    ra?: string,
    matricula?: string,
    aniversario?: Date
  ): Promise<AxiosResponse<{ id: number }>> {
    const res = await api.request({
      url: `/api/user/register`,
      method: "POST",
      data: {
        nome,
        email,
        senha,
        ra,
        matricula,
        aniversario: aniversario?.toISOString(),
      },
    });

    res.data.id = Number(res.data.id);

    return res;
  },

  login: async function (
    email: string,
    senha: string,
    remember: boolean
  ): Promise<AxiosResponse<{ token: Token; user: User }>> {
    const res = await api.request({
      url: `/api/user/login`,
      method: "POST",
      data: {
        email,
        password: senha,
        remember,
      },
    });

    res.data.token = parseTokenResponse(res.data.token);
    res.data.user = parseUserResponse(res.data.user);

    return res;
  },

  confirmEmail: async function (token: string): Promise<AxiosResponse<{}>> {
    return await api.request({
      url: `/api/user/confirm/${token}`,
      method: "POST",
    });
  },

  passwordRecovery: async function (email: string): Promise<AxiosResponse<{}>> {
    return await api.request({
      url: `/api/user/resetpassword`,
      method: "POST",
      data: {
        email,
      },
    });
  },

  resetPassword: async function (
    token: string,
    senha: string
  ): Promise<AxiosResponse<{}>> {
    return await api.request({
      url: `/api/user/resetpassword/${token}`,
      method: "POST",
      data: {
        password: senha,
      },
    });
  },

  getLoggedUser: async function (): Promise<AxiosResponse<User>> {
    const res = await api.request({
      url: `/api/user/me`,
      method: "GET",
    });

    res.data = parseUserResponse(res.data);

    return res;
  },

  deleteUser: async function (id: number): Promise<AxiosResponse<{}>> {
    return await api.request({
      url: `/api/user/${id}`,
      method: "DELETE",
    });
  },

  getUserById: async function (id: number): Promise<AxiosResponse<User>> {
    const res = await api.request({
      url: `/api/user/${id}`,
      method: "GET",
    });

    res.data = parseUserResponse(res.data);

    return res;
  },

  getAllUsers: async function (): Promise<AxiosResponse<User[]>> {
    const res = await api.request({
      url: `/api/user/`,
      method: "GET",
    });

    res.data = res.data.map((user: any) => parseUserResponse(user));

    return res;
  },

  updateUser: async function (
    id: number,
    nome: string,
    email: string,
    ra?: string,
    matricula?: string,
    aniversario?: Date
  ): Promise<AxiosResponse<{}>> {
    const res = await api.request({
      url: `/api/user/${id}`,
      method: "PUT",
      data: {
        nome,
        email,
        ra,
        matricula,
        aniversario: aniversario?.toISOString(),
      },
    });

    res.data = parseUserResponse(res.data);

    return res;
  },
};
