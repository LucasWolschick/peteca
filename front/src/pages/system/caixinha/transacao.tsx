import React, { useState, useEffect } from "react";
import SystemTemplate from "../_systemtemplate";
import Title from "@/components/system/Title";
import styles from "./transacao.module.css";
import { useTransaction } from "@/hooks/useTransaction";

const Transacao = () => {
  const {
    transactions,
    createTransaction,
    getAllTransactions,
    loading,
    error,
  } = useTransaction();
  const [valor, setValor] = useState("");
  const [banco, setBanco] = useState("");
  const [referencia, setReferencia] = useState("");
  const [data, setData] = useState("");
  const [tipo, setTipo] = useState("receita");
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      await getAllTransactions();
    };
    fetchTransactions();
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
  };

  return (
    <SystemTemplate>
      <Title title="Caixinha" />
      <div className={styles.container}>
        <div className={styles.saldo}>
          <h2>SALDO</h2>
          <h2>R$ {saldo.toFixed(2)}</h2>
        </div>

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
            <input
              type="text"
              name="banco"
              id="banco"
              placeholder="Insira o ID da conta"
              value={banco}
              onChange={(e) => setBanco(e.target.value)}
            />
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
          <div className={styles.input_field}>
            <label htmlFor="referencia">Referencia: </label>
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
