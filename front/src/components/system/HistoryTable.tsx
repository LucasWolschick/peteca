import { itemsAPI } from "@/apis/itemsAPI";
import { Log } from "@/pages/system/caixinha/historico";
import moment from "moment";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// Component that shows the history of items
export default function HistoryTable() {
  const [logs, setLogs] = useState<Log[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLogs = async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const now = new Date();
      now.setDate(now.getDate() + 1);
      const response = await itemsAPI.getLogs(thirtyDaysAgo, now);
      setLogs(response.data);
    };

    fetchLogs();
  }, []);

  console.log(logs);

  return (
    <>
      <div className="table-responsive bg-white">
        <table className="table table-striped">
          <thead className="sticky-top">
            <tr>
              <th>Nome</th>
              <th>Data</th>
              <th>Tipo de Movimentação</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.data + log.item.nome}>
                <td>{log.item.nome}</td>
                <td>{moment(log.data).format("DD/MM/YYYY hh:mm:ss")}</td>
                <td>{log.tipo}</td>
                <td>{log.autor.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* </Link> */}
      </div>
    </>
  );
}
