import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/user";

export const useUser = () => {
  const [user, setUser] = useState<any>(null);
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

  const getUser = async () => {
    await fetchData(async () => {
      const config = getTokenConfig();
      const response = await axios.get(`${API_URL}`, config);
      setUser(response.data);
    });
  };

  return {
    user,
    loading,
    error,
    getUser,
  };
};
