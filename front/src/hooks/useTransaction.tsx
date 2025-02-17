import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";

export const useTransaction = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função genérica para lidar com chamadas assíncronnas
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

  const createTransaction = async (data: any) => {
    await fetchData(async () => {
      const config = getTokenConfig();
      const response = await axios.post(
        `${API_URL}/api/transactions/create`,
        data,
        config
      );
      setTransactions((prevTransactions: any[]) => [
        ...prevTransactions,
        response.data,
      ]);
    });
  };

  const getAllTransactions = async () => {
    await fetchData(async () => {
      const config = getTokenConfig();
      const response = await axios.get(`${API_URL}/api/transactions`, config);
      setTransactions(response.data);
    });
  };

  const searchTransaction = async (query: string, from: Date, to: Date) => {
    await fetchData(async () => {
      const config = getTokenConfig();
      const response = await axios.get(
        `${API_URL}/api/transactions/filter?q=${query}&from=${from}&to=${to}`,
        config
      );
      setTransactions(response.data);
    });
  };

  const getTransactionById = async (id: string) => {
    await fetchData(async () => {
      const config = getTokenConfig();
      const response = await axios.get(
        `${API_URL}/api/transactions/${id}`,
        config
      );
      setTransactions([response.data]);
    });
  };

  const updateTransaction = async (id: string, data: any) => {
    await fetchData(async () => {
      const config = getTokenConfig();
      const response = await axios.put(
        `${API_URL}/api/transactions/${id}`,
        data,
        config
      );
      setTransactions((prevTransactions: any[]) =>
        prevTransactions.map((transaction) =>
          transaction.id === id ? response.data : transaction
        )
      );
    });
  };

  const deleteTransaction = async (id: string) => {
    await fetchData(async () => {
      const config = getTokenConfig();
      await axios.delete(`${API_URL}/api/transactions/${id}`, config);
      setTransactions((prevTransactions: any[]) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    });
  };

  const generateReport = async (from: string, to: string) => {
    try {
      const config = getTokenConfig();
      const response = await axios.post(
        `${API_URL}/api/transactions/reports/create`,
        { from, to },
        config
      );
      console.log(response);
      return response.headers.location;
    } catch (error) {
      console.log("Erro na geração do relatório:", error);
      setError("Algo deu errado na geração do relatório");
    }
  };

  const generateStatement = async (from?: string, to?: string, q?: string) => {
    try {
      const config = getTokenConfig();
      const response = await axios.post(
        `${API_URL}/api/transactions/statements/create`,
        { from, to, q },
        config
      );
      console.log(response);
      return response.headers.location;
    } catch (error) {
      console.log("Erro na geração do extrato:", error);
      setError("Algo deu errado na geração do extrato");
    }
  };

  const downloadStatement = async (url: string) => {
    try {
      const config = getTokenConfig();
      const response = await axios.get(`${API_URL}${url}`, {
        ...config,
        responseType: "blob",
      });
      const url1 = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url1;
      link.setAttribute("download", "statement.html");
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url1);
      link.remove();
    } catch (error) {
      console.log("Erro no download do extrato:", error);
      setError("Algo deu errado no download do extrato");
    }
  };

  const downloadReport = async (url: string) => {
    try {
      const config = getTokenConfig();
      const response = await axios.get(`${API_URL}${url}`, {
        ...config,
        responseType: "blob",
      });
      const url1 = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url1;
      link.setAttribute("download", "report.html");
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url1);
      link.remove();
    } catch (error) {
      console.log("Erro no download do relatório:", error);
      setError("Algo deu errado no download do relatório");
    }
  };

  return {
    transactions,
    loading,
    error,
    createTransaction,
    getAllTransactions,
    searchTransaction,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    generateReport,
    downloadReport,
    generateStatement,
    downloadStatement,
  };
};
