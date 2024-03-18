import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { itemsAPI } from "@/apis/itemsAPI";
import SystemTemplate from "./_systemtemplate";
import Title from "@/components/system/Title";
import ItemEntry from "@/components/system/ItemEntry";
import moment from "moment";
import HistoryTable from "@/components/system/HistoryTable";

export type Log = {
  id: number;
  tipo: string;
  data: string;
  delta: any;
  autor: {
    id: number;
    nome: string;
  };
  item: {
    id: number;
    nome: string;
    quantidade: number;
    unidadeMedida: string;
    local: string;
  };
};

export default function Historico() {
  const [logs, setLogs] = useState<Log[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await itemsAPI.getLogs("2023-09-15", "2024-03-18");
      console.log(response.data);
      setLogs(response.data);
    };

    fetchLogs();
  }, []);

  return (
    <SystemTemplate>
      <div className="container-fluid">
        <Title title="Histórico de Transações" />
        <HistoryTable />
        <div className="mt-3 d-flex justify-content-center">
          <button className="btn btn-info btn-sm rounded-5 col-lg-4 col-md-5 col-10 mt-2 mt-md-0 ">
            <Link
              href="/system/estoque"
              className="text-decoration-none text-black"
            >
              Voltar
            </Link>
          </button>
        </div>
      </div>
    </SystemTemplate>
  );
}
