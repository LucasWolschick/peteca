import { AxiosResponse } from "axios";
import { api } from "./configs/axiosConfigs";
import { Permission } from "./permissionsAPI";

export interface SystemConfiguration {
  cor: string;
  permissoes: Permission[];
}

export const SystemAPI = {
  getConfigurations: async function (): Promise<
    AxiosResponse<SystemConfiguration>
  > {
    return await api.request({
      url: `/api/config`,
      method: "GET",
    });
  },
};
