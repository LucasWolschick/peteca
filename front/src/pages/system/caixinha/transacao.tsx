import React from "react";
import SystemTemplate from "../_systemtemplate";
import Title from "@/components/system/Title";
import styles from "./transacao.module.css";

const transacao = () => {
  return (
    <SystemTemplate>
      <Title title="Caixinha  " />
      <div className={styles.container}>
        <div className={styles.saldo}>
          <h2>SALDO</h2>
          <h2>R$ 0,00</h2>
        </div>

        <div className={styles.inputs}>
          <div className={styles.input_field}>
            <label htmlFor="valor">Valor: </label>
            <input
              type="text"
              name="valor"
              id="valor"
              placeholder="Insira o valor da transação aqui (R$)"
            />
          </div>
          <div className={styles.input_field}>
            <label htmlFor="banco">Banco: </label>
            <input
              type="text"
              name="banco"
              id="banco"
              placeholder="Insira o nome do banco"
            />
          </div>
          <div className={styles.buttons}>
            <label htmlFor="botao">Tipo de Transação: </label>
            <button>Entrada</button>
            <button style={{ backgroundColor: "black" }}>Saída</button>
            <button style={{ backgroundColor: "black" }}>Pendência</button>
          </div>
          <div className={styles.input_field}>
            <label htmlFor="referencia">Referencia: </label>
            <input
              type="text"
              name="referencia"
              id="referencia"
              placeholder="Insira a referência aqui"
            />
          </div>
          <div className={styles.input_field}>
            <label htmlFor="data">Data: </label>
            <input type="date" name="data" id="data" />
          </div>
        </div>
        <div className={styles.subtotal}>
          <h2 className={styles.valor}>SUBTOTAL</h2>
          <h2>R$ 0,00</h2>
        </div>

        <div className={styles.botao_transacao}>
          <button>Lançar Transação</button>
        </div>
      </div>
    </SystemTemplate>
  );
};

export default transacao;
