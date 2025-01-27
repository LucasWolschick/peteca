import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  CreateTransactionDTO,
  transactionAPI,
  UpdateTransactionDTO,
} from "@/apis/transactionAPI";
import Dialog from "@/components/system/Dialog";
import Title from "@/components/system/Title";
import SystemTemplate from "@/pages/system/_systemtemplate";
import { accountAPI } from "@/apis/accountAPI";

interface TransactionFormProps {
  transactionId?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ transactionId }) => {
  const router = useRouter();

  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [valor, setValor] = useState("");
  const [banco, setBanco] = useState("");
  const [referencia, setReferencia] = useState("");
  const [data, setData] = useState("");
  const [tipo, setTipo] = useState<"RECEITA" | "DESPESA" | "PENDENCIA">(
    "RECEITA"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch accounts first
        const accountsResponse = await accountAPI.getAccounts();
        setAccounts(accountsResponse.data);

        // If transactionId is provided, fetch transaction details
        if (transactionId) {
          const transactionResponse = await transactionAPI.getById(
            Number(transactionId)
          );
          const transaction = transactionResponse.data;
          setValor(transaction.valor.toString());
          console.log("setting banco", transaction.contaId.toString());
          setBanco(transaction.contaId.toString());
          setReferencia(transaction.referencia);
          setData(new Date(transaction.data).toISOString().split("T")[0]);
          setTipo(transaction.tipo);
        }
      } catch (err) {
        console.error(err);
        setError(
          transactionId
            ? "Erro ao carregar transação"
            : "Erro ao carregar contas"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [transactionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const transactionData: CreateTransactionDTO | UpdateTransactionDTO = {
      valor: parseFloat(valor),
      conta: parseInt(banco),
      referencia,
      data: new Date(data),
      tipo: tipo.toLowerCase() as any,
    };

    try {
      setLoading(true);
      if (transactionId) {
        await transactionAPI.update(
          Number(transactionId),
          transactionData as UpdateTransactionDTO
        );
      } else {
        await transactionAPI.create(transactionData as CreateTransactionDTO);
      }
      router.push("/system/caixinha");
    } catch (err) {
      console.error(err);
      setError("Erro ao salvar transação");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (transactionId) {
      try {
        setLoading(true);
        await transactionAPI.delete(Number(transactionId));
        router.push("/system/caixinha");
      } catch (err) {
        console.error(err);
        setError("Erro ao deletar transação");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SystemTemplate>
      <Title
        title={transactionId ? "Editar Transação" : "Criar Transação"}
        backRoute="/system/caixinha"
      />
      <div className="container col-md-7 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="valor">Valor: </label>
            <input
              className="form-control"
              type="number"
              name="valor"
              id="valor"
              placeholder="Insira o valor da transação aqui (R$)"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="banco">Banco: </label>
            <select
              name="banco"
              id="banco"
              onChange={(e) => setBanco(e.target.value)}
              value={banco}
              className="form-control"
            >
              <option value="">Selecione um banco...</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="referencia">Referência: </label>
            <input
              className="form-control"
              type="text"
              name="referencia"
              id="referencia"
              placeholder="Insira a referência aqui"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="data">Data: </label>
            <input
              className="form-control"
              type="date"
              name="data"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className="col-12 d-flex justify-content-center gap-3 my-3">
            <label className="align-self-center mb-0">Tipo de Transação:</label>
            <button
              type="button"
              onClick={() => setTipo("RECEITA")}
              className={`btn ${
                tipo === "RECEITA" ? "btn-success" : "btn-secondary"
              }`}
            >
              Entrada
            </button>
            <button
              type="button"
              onClick={() => setTipo("DESPESA")}
              className={`btn ${
                tipo === "DESPESA" ? "btn-danger" : "btn-secondary"
              }`}
            >
              Saída
            </button>
            <button
              type="button"
              onClick={() => setTipo("PENDENCIA")}
              className={`btn ${
                tipo === "PENDENCIA" ? "btn-warning" : "btn-secondary"
              }`}
            >
              Pendência
            </button>
          </div>
          <div className="d-flex justify-content-between gap-3 mt-3 align-items-center flex-column">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading
                ? "Processando..."
                : transactionId
                ? "Salvar Alterações"
                : "Lançar Transação"}
            </button>
            {transactionId && (
              <Dialog
                text="Tem certeza que deseja deletar a transação?"
                buttonText="Deletar"
                onConfirm={handleDelete}
                className="btn btn-danger w-100 mt-2"
              />
            )}
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </SystemTemplate>
  );
};

export default TransactionForm;
