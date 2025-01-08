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

  return {
    accounts,
    loading,
    error,
    getAllAccounts,
  };
};
