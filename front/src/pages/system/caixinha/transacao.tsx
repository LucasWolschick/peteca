import React, { useState, useEffect } from "react";
import SystemTemplate from "../_systemtemplate";
import Title from "@/components/system/Title";
import styles from "./transacao.module.css";
import { useTransaction } from "@/hooks/useTransaction";
import { useAccount } from "@/hooks/useAccount";
import router from "next/router";

const Transacao = () => {
  const {
    transactions,
    createTransaction,
    getAllTransactions,
    loading,
    error,
  } = useTransaction();

  const { accounts, getAllAccounts } = useAccount();

  useEffect(() => {
    getAllAccounts();
  }, []);

  const [valor, setValor] = useState("");
  const [banco, setBanco] = useState("");
  const [referencia, setReferencia] = useState("");
  const [data, setData] = useState("");
  const [tipo, setTipo] = useState("receita");
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    if (accounts.length > 0) {
      setBanco(accounts[0].id.toString());
    }
  }, [accounts]);

  useEffect(() => {
    getAllTransactions();
  }, []);

  useEffect(() => {
    const calculateSaldo = () => {
      const saldoAtual = transactions.reduce((acc, transaction) => {
        if (transaction.tipo === "RECEITA") {
          return acc + parseFloat(transaction.valor);
        } else if (transaction.tipo === "DESPESA") {
          return acc - parseFloat(transaction.valor);
        }
        return acc;
      }, 0);
      setSaldo(saldoAtual);
    };
    calculateSaldo();
  }, [transactions]);

  const handleCreateTransaction = async () => {
    const transactionData = {
      valor: parseFloat(valor),
      data: new Date(data),
      referencia,
      tipo,
      conta: parseInt(banco),
    };
    console.log("Enviando dados da transação:", transactionData);
    await createTransaction(transactionData);
    router.push("/system/caixinha");
  };

  return (
    <SystemTemplate>
      <Title title="Caixinha" />
      <div className="container">
        <div className="text-center">
          <h2>SALDO</h2>
          <h2>R$ {saldo.toFixed(2)}</h2>
        </div>

        <div className="row text-center">
          <div className="col-12">
            <label htmlFor="valor">Valor: </label>
            <input
              className="form-control"
              type="text"
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
              className="form-control"
              name="banco"
              id="banco"
              onChange={(e) => setBanco(e.target.value)}
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
              onClick={() => setTipo("receita")}
              style={{
                backgroundColor: tipo === "receita" ? "green" : "black",
              }}
            >
              Entrada
            </button>
            <button
              onClick={() => setTipo("despesa")}
              style={{ backgroundColor: tipo === "despesa" ? "red" : "black" }}
            >
              Saída
            </button>
            <button
              onClick={() => setTipo("pendencia")}
              style={{
                backgroundColor: tipo === "pendencia" ? "orange" : "black",
              }}
            >
              Pendência
            </button>
          </div>
          <div className="col-12">
            <label htmlFor="referencia">Referencia: </label>
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
        </div>
        <div className={styles.subtotal}>
          <h2 className={styles.valor}>SUBTOTAL</h2>
          <h2>R$ {valor ? parseFloat(valor).toFixed(2) : "0.00"}</h2>
        </div>

        <div className={styles.botao_transacao}>
          <button onClick={handleCreateTransaction} disabled={loading}>
            {loading ? "Processando..." : "Lançar Transação"}
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </SystemTemplate>
  );
};

export default Transacao;
