import { AxiosResponse } from "axios";
import { api } from "./configs/axiosConfigs";

export type Permission =
  | "Gerir Cadastros"
  | "Gerir Documentos"
  | "Gerir Caixinha"
  | "Gerir Estoque"
  | "Gerir Calendário"
  | "Visualizar Caixinha"
  | "Visualizar Documentos"
  | "Visualizar Registros"
  | "admin";

export type Permissions = Permission[];

export const PermissionsAPI = {
  getAllPermissions: async function (): Promise<AxiosResponse<Permissions>> {
    return await api.request({
      url: `/api/permissions/all`,
      method: "GET",
    });
  },

  getUserPermissions: async function (
    id: number
  ): Promise<AxiosResponse<Permissions>> {
    return await api.request({
      url: `/api/permissions/user/${id}`,
      method: "GET",
    });
  },

  setUserPermissions: async function (
    id: number,
    permissions: Permissions
  ): Promise<AxiosResponse<{}>> {
    return await api.request({
      url: `/api/permissions/user/${id}`,
      method: "POST",
      data: {
        permissions,
      },
    });
  },
};
