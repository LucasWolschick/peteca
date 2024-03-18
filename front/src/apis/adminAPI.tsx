import { AxiosResponse } from "axios";
import { api } from "./configs/axiosConfigs";

export type Log = {
  level: "debug" | "info" | "warn" | "error";
  message: string;
  timestamp: Date;
};

export const AdminAPI = {
  getLogs: async function (
    from?: Date,
    to?: Date,
    limit?: number,
    level?: string
  ): Promise<AxiosResponse<Log[]>> {
    const logs = await api.request({
      url: `/api/admin/logs`,
      method: "GET",
      params: { from, to, limit, level },
    });

    logs.data = logs.data.map((log: Log) => {
      log.timestamp = new Date(log.timestamp);
      return log;
    });

    return logs;
  },

  doBackup: async function (): Promise<AxiosResponse<Blob>> {
    return await api({
      url: `/api/admin/do-backup`,
      method: "GET",
      responseType: "blob",
    });
  },

  importBackup: async function (file: File): Promise<AxiosResponse<void>> {
    const formData = new FormData();
    formData.append("backupFile", file);

    return await api.request({
      url: `/api/admin/import-backup`,
      method: "POST",
      data: formData,
    });
  },
};
