import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SystemTemplate from "@/pages/system/_systemtemplate";
import Title from "@/components/system/Title";
import { accountAPI } from "@/apis/accountAPI";

interface AccountFormProps {
  accountId?: string;
}

const AccountForm: React.FC<AccountFormProps> = ({ accountId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (accountId) {
        try {
          setLoading(true);
          const response = await accountAPI.getAccount(parseInt(accountId));
          setNome(response.data.nome);
          setDescricao(response.data.descricao);
        } catch (err) {
          console.error(err);
          setError("Erro ao carregar conta");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [accountId]);

  const handleAddAccount = async () => {
    await accountAPI.criar(nome, descricao);
    router.push("/system/caixinha/contas");
  };

  return (
    <SystemTemplate>
      <Title
        title={accountId ? "Editar Conta" : "Nova Conta"}
        backRoute="/system/caixinha/contas"
      />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddAccount();
              }}
            >
              <div className="mb-3">
                <label htmlFor="formNome" className="form-label">
                  Nome da Conta
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formNome"
                  placeholder="Digite o nome da conta"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formDescricao" className="form-label">
                  Descrição
                </label>
                <textarea
                  className="form-control"
                  id="formDescricao"
                  rows={3}
                  placeholder="Digite a descrição da conta"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={loading}
              >
                {loading
                  ? "Processando..."
                  : accountId
                  ? "Editar Conta"
                  : "Adicionar Conta"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => router.push("/system/caixinha/contas")}
              >
                Cancelar
              </button>
              {error && <p className="text-danger mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </SystemTemplate>
  );
};

export default AccountForm;
