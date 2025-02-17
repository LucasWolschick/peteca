import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { itemsAPI } from "@/apis/itemsAPI";
import SystemTemplate from "@/pages/system/_systemtemplate";
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
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const now = new Date();
      const response = await itemsAPI.getLogs(thirtyDaysAgo, now);
      setLogs(response.data);
    };

    fetchLogs();
  }, []);

  return (
    <SystemTemplate>
      <div className="container-fluid">
        <Title title="Histórico de Movimentações" />
        <HistoryTable />
        <div className="mt-3 d-flex justify-content-center">
          <Link
            href="/system/estoque"
            className="text-decoration-none text-black btn btn-info btn-sm rounded-5 col-lg-4 col-md-5 col-10 mt-2 mt-md-0 "
          >
            Voltar
          </Link>
        </div>
      </div>
    </SystemTemplate>
  );
}
