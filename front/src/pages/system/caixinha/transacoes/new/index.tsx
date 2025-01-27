import React, { useState, useEffect } from "react";
import SystemTemplate from "@/pages/system/_systemtemplate";
import Title from "@/components/system/Title";
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
    await createTransaction(transactionData);
    router.push("/system/caixinha");
  };

  return (
    <SystemTemplate>
      <Title title="Criar Transação" backRoute="/system/caixinha" />
      <div className="container">
        <div className="text-center">
          <h2>SALDO</h2>
          <h2>R$ {saldo.toFixed(2)}</h2>
        </div>

        <div className="row g-2 col-md-7 mx-auto text-center">
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
              value={banco}
              onChange={(e) => setBanco(e.target.value)}
            >
              <option value="">Selecione um banco...</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 d-flex justify-content-center gap-3 my-3">
            <label className="align-self-center mb-0">Tipo de Transação:</label>
            <button
              onClick={() => setTipo("receita")}
              className={`btn ${
                tipo === "receita" ? "btn-success" : "btn-secondary"
              }`}
            >
              Entrada
            </button>
            <button
              onClick={() => setTipo("despesa")}
              className={`btn ${
                tipo === "despesa" ? "btn-danger" : "btn-secondary"
              }`}
            >
              Saída
            </button>
            <button
              onClick={() => setTipo("pendencia")}
              className={`btn ${
                tipo === "pendencia" ? "btn-warning" : "btn-secondary"
              }`}
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
        <div className="d-flex justify-content-center align-items-center my-3">
          <h2 className="me-3">SUBTOTAL</h2>
          <h2>{valor ? `R$ ${parseFloat(valor).toFixed(2)}` : "R$ 0.00"}</h2>
        </div>

        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={handleCreateTransaction}
            disabled={loading}
          >
            {loading ? "Processando..." : "Lançar Transação"}
          </button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      </div>
    </SystemTemplate>
  );
};

export default Transacao;
