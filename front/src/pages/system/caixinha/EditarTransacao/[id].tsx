import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SystemTemplate from "../../_systemtemplate"; // Ajuste o caminho se necessário
import Title from "@/components/system/Title";
import styles from "../transacao.module.css"; // Ajuste o caminho se necessário
import { useTransaction } from "@/hooks/useTransaction";
import { useAccount } from "@/hooks/useAccount";
import Dialog from "@/components/system/Dialog";

const EditarTransacao = () => {
  const router = useRouter();
  const { id } = router.query; // Obter o ID da transação da rota
  const {
    getTransactionById,
    updateTransaction,
    transactions,
    loading,
    error,
    deleteTransaction,
  } = useTransaction();

  const { accounts, getAllAccounts } = useAccount();

  useEffect(() => {
    getAllAccounts();
  }, []);

  const [valor, setValor] = useState("");
  const [banco, setBanco] = useState("");
  const [referencia, setReferencia] = useState("");
  const [data, setData] = useState("");
  const [tipo, setTipo] = useState<"RECEITA" | "DESPESA" | "PENDENCIA">(
    "RECEITA"
  );

  const [showDeleteMModal, setShowDeleteModal] = useState(false);
  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  // Buscar os dados da transação ao carregar a página
  useEffect(() => {
    if (accounts.length > 0) {
      setBanco(accounts[0].id.toString());
    }
    if (id) {
      const fetchTransaction = async () => {
        await getTransactionById(id as string);
      };
      fetchTransaction();
    }
  }, [id, accounts]);

  // Preencher os campos com os dados da transação carregada
  useEffect(() => {
    if (transactions.length > 0) {
      const transaction = transactions[0]; // A transação carregada

      setValor(parseFloat(transaction.valor || 0).toFixed(2)); // Valor com fallback
      setBanco(transaction.conta ? transaction.conta.toString() : ""); // Banco com fallback
      setTipo(transaction.tipo ? transaction.tipo : "RECEITA"); // Tipo com fallback
      setReferencia(transaction.referencia || ""); // Referência com fallback
      setData(
        transaction.data
          ? new Date(transaction.data).toISOString().split("T")[0]
          : ""
      ); // Data com fallback
    }
  }, [transactions]);

  // Atualizar a transação
  const handleUpdateTransaction = async () => {
    const transactionData = {
      valor: parseFloat(valor),
      conta: parseInt(banco),
      referencia,
      data: new Date(data),
      tipo: tipo.toLowerCase(),
    };
    console.log("Atualizando transação:", transactionData);
    await updateTransaction(id as string, transactionData);
    router.push("/system/caixinha"); // Redirecionar após atualizar
  };

  const confirmDeleteTransaction = async () => {
    await deleteTransaction(id as string);
    router.push("/system/caixinha");
  };

  return (
    <SystemTemplate>
      <Title title="Editar Transação" />
      <div className={styles.container}>
        <div className={styles.inputs}>
          <div className={styles.input_field}>
            <label htmlFor="valor">Valor: </label>
            <input
              type="text"
              name="valor"
              id="valor"
              placeholder="Insira o valor da transação aqui (R$)"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
          <div className={styles.input_field}>
            <label htmlFor="banco">Banco: </label>
            <select
              name="banco"
              id="banco"
              onChange={(e) => setBanco(e.target.value)}
              className={styles.input_field}
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.nome}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.buttons}>
            <label htmlFor="botao">Tipo de Transação: </label>
            <button
              onClick={() => setTipo("RECEITA")}
              style={{
                backgroundColor: tipo === "RECEITA" ? "green" : "black",
              }}
            >
              Entrada
            </button>
            <button
              onClick={() => setTipo("DESPESA")}
              style={{
                backgroundColor: tipo === "DESPESA" ? "red" : "black",
              }}
            >
              Saída
            </button>
            <button
              onClick={() => setTipo("PENDENCIA")}
              style={{
                backgroundColor: tipo === "PENDENCIA" ? "orange" : "black",
              }}
            >
              Pendência
            </button>
          </div>
          <div className={styles.input_field}>
            <label htmlFor="referencia">Referência: </label>
            <input
              type="text"
              name="referencia"
              id="referencia"
              placeholder="Insira a referência aqui"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
            />
          </div>
          <div className={styles.input_field}>
            <label htmlFor="data">Data: </label>
            <input
              type="date"
              name="data"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between gap-3 mt-3 w-50 align-items-center flex-column">
          <Dialog
            text="Tem certeza que deseja deletar a transação?"
            buttonText="Deletar"
            onConfirm={confirmDeleteTransaction}
          />

          <button
            className="btn btn-primary btn-sm rounded-5 col-lg-8 "
            onClick={handleUpdateTransaction}
            disabled={loading}
          >
            {loading ? "Atualizando..." : "Salvar Alterações"}
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </SystemTemplate>
  );
};

export default EditarTransacao;
