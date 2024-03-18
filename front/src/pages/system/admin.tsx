import Title from "@/components/system/Title";
import SystemTemplate from "./_systemtemplate";
import { AdminAPI } from "@/apis/adminAPI";

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
          <div className="col-lg-7 bg-light-violet-blue mt-3 mt-lg-0">
            <div className="row p-2">
              <div className="bg-light-gray text-dark">
                <h5 className="fw-bolder text-center mt-2">
                  27-02-2003 - 07-03-2003
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SystemTemplate>
  );
}
