import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/accounts";

export const useAccount = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (callback: () => Promise<void>) => {
    setLoading(true);
    setError(null);

    try {
      await callback();
    } catch (error) {
      console.log("Erro na requisição:", error);
      setError("Algo deu errado");
    } finally {
      setLoading(false);
    }
  };

  const getTokenConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const getAllAccounts = async () => {
    await fetchData(async () => {
      const config = getTokenConfig();
      const response = await axios.get(API_URL, config);
      setAccounts(response.data);
    });
  };

  const createAccount = async (data: any) => {
    await fetchData(async () => {
      const config = getTokenConfig();
      const response = await axios.post(`${API_URL}/create`, data, config);
      setAccounts((prevAccounts: any[]) => [...prevAccounts, response.data]);
    });
  };

  const getAccountLogs = async (id: string) => {
    await fetchData(async () => {
      const config = getTokenConfig();
      const response = await axios.get(`${API_URL}/${id}/logs`, config);
      setAccounts((prevAccounts: any[]) =>
        prevAccounts.map((account) =>
          account.id === id ? { ...account, logs: response.data } : account
        )
      );
    });
  };

  const getAccountById = async (id: string): Promise<any> => {
    let account;
    await fetchData(async () => {
      const config = getTokenConfig();
      const response = await axios.get(`${API_URL}/${id}`, config);
      account = response.data;
    });

    return account;
  };

  const updateAccount = async (id: string, data: any) => {
    await fetchData(async () => {
      const config = getTokenConfig();
      const response = await axios.put(`${API_URL}/${id}`, data, config);
      setAccounts((prevAccounts: any[]) =>
        prevAccounts.map((account) =>
          account.id === id ? response.data : account
        )
      );
    });
  };

  const deleteAccount = async (id: string) => {
    await fetchData(async () => {
      const config = getTokenConfig();
      await axios.delete(`${API_URL}/${id}`, config);
      setAccounts((prevAccounts: any[]) =>
        prevAccounts.filter((account) => account.id !== id)
      );
    });
  };

  return {
    accounts,
    loading,
    error,
    getAllAccounts,
    createAccount,
    getAccountLogs,
    getAccountById,
    updateAccount,
    deleteAccount,
  };
};
