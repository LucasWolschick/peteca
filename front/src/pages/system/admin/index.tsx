import Title from "@/components/system/Title";
import SystemTemplate from "@/pages/system/_systemtemplate";
import { AdminAPI, Log } from "@/apis/adminAPI";
import { useEffect, useState } from "react";

export default function Index() {
  const fazerBackup = () => {
    AdminAPI.doBackup()
      .then(({ data: blob }) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "backup.sql";
        a.click();
        URL.revokeObjectURL(url);
        a.remove();
      })
      .catch((error) => {
        console.error(error);
        alert("Erro no download do backup!");
      });
  };

  const importarBackup = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".sql";
    input.onchange = () => {
      if (input.files && input.files[0]) {
        AdminAPI.importBackup(input.files[0])
          .then(() => {
            alert("Backup importado com sucesso!");
          })
          .catch((error) => {
            alert("Erro ao importar backup!");
            console.error(error);
          })
          .finally(() => {
            input.remove();
          });
      }
    };
    input.click();
  };

  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    AdminAPI.getLogs()
      .then(({ data }) => {
        setLogs(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <SystemTemplate>
      <div className="container-fluid">
        <Title title={"Administração"} />
        <div className="row justify-content-between">
          <div className="col-lg-4">
            <div className="row">
              <button
                className="btn btn-primary btn-sm rounded-5 mb-3"
                onClick={() => fazerBackup()}
              >
                Fazer backup
              </button>
              <button
                className="btn btn-primary btn-sm rounded-5"
                onClick={() => importarBackup()}
              >
                Importar backup
              </button>
            </div>
          </div>
          <div className="col-lg-7 mt-3 mt-lg-0">
            <div className="table-responsive bg-white">
              <table className="table table-sm table-striped">
                <thead className="sticky-top">
                  <tr>
                    <th>Data</th>
                    <th>Nível</th>
                    <th>Mensagem</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.timestamp + log.message}>
                      <td>{log.timestamp.toLocaleString()}</td>
                      <td>{log.level}</td>
                      <td>{log.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SystemTemplate>
  );
}
