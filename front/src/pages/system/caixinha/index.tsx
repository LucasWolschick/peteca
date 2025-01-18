import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import SystemTemplate from "../_systemtemplate";
import Title from "@/components/system/Title";
import Link from "next/link";
import {useTransaction} from "@/hooks/useTransaction";
import {useAccount} from "@/hooks/useAccount";
import {useUser} from "@/hooks/useUser";

const Chart = dynamic(() => import("react-apexcharts"), {ssr: false});

const Caixinha = () => {
  const {transactions, getAllTransactions} = useTransaction();
  const {accounts, getAllAccounts} = useAccount();
  const {user, getUser} = useUser();
  const [isClient, setIsClient] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.id === 'startDate') {
      setFrom(value ? new Date(value) : null);
    } else if (e.target.id === 'endDate') {
      setTo(value ? new Date(value) : null);
    }
  };

  const handleSearch = async () => {

  };

  const [chartData, setChartData] = useState<{
    series: { name: string; data: number[] }[];
    options: {
      chart: {
        type: "line";
        toolbar: { show: boolean };
        style: { fontFamily: string; color: string };
      };
      xaxis: {
        categories: string[];
        style: { fontSize: string; color: string };
      };
      title: {
        text: string;
        align: "center";
        style: { fontSize: string; color: string };
      };
      colors: string[];
    };
  }>({
    series: [
      {
        name: "Entradas",
        data: [], // Dados do gráfico
      },
      {
        name: "Saídas",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "line" as "line", // Tipo de gráfico (line, bar, pie, etc.)
        toolbar: {
          show: false, // Oculta a barra de ferramentas
        },
        style: {
          fontFamily: "inherit",
          color: "#fff",
        },
      },
      xaxis: {
        categories: [], // Categorias do eixo x
        style: {
          fontSize: "14px",
          color: "#fff",
        },
      },
      title: {
        text: "Entradas e Saídas",
        align: "center" as "center",
        style: {
          fontSize: "20px",
          color: "#fff",
        },
      },
      colors: ["#00E396", "#FF4560"], // Cores das linhas
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getAllTransactions();
      await getAllAccounts();
      await getUser();
    };
    fetchData();
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

    const updateChartData = () => {
      const entradas = transactions
        .filter((transaction) => transaction.tipo === "RECEITA")
        .map((transaction) => parseFloat(transaction.valor));
      const saidas = transactions
        .filter((transaction) => transaction.tipo === "DESPESA")
        .map((transaction) => parseFloat(transaction.valor));
      const categorias = transactions.map((transaction) =>
        new Date(transaction.data).toLocaleDateString()
      );

      setChartData((prevData) => ({
        ...prevData,
        series: [
          {...prevData.series[0], data: entradas},
          {...prevData.series[1], data: saidas},
        ],
        options: {
          ...prevData.options,
          xaxis: {
            ...prevData.options.xaxis,
            categories: categorias,
          },
        },
      }));
    };

    calculateSaldo();
    updateChartData();
  }, [transactions]);

  return (
    <SystemTemplate>
      <Title title="Caixinha"/>
      <div className="d-flex flex-column flex-md-row justify-content-between gap-4">
        {/* Coluna 1 */}
        <div className="col-md-4 mb-4">
          <div className="mb-4">
            <span
              className="text-uppercase fw-bold"
              style={{color: "#E0972F"}}
            >
              Saldo
            </span>
            <h1 className="display-5">R$ {saldo.toFixed(2)}</h1>
          </div>
          <div className="mb-4">
            <span
              style={{color: "#E0972F"}}
              className="text-uppercase fw-bold"
            >
              Contas
            </span>
            {Array.isArray(accounts) &&
              accounts.map((account) => (
                <div
                  className="d-flex justify-content-between items-center"
                  key={account.id}
                >
                  <p>{account.nome}</p>
                  <p>R$ {parseFloat(account.saldo).toFixed(2)}</p>
                </div>
              ))}
          </div>
          <div className="mb-4">
            <span
              style={{color: "#E0972F"}}
              className="text-uppercase fw-bold"
            >
              Pendências
            </span>
            <div className="d-flex justify-content-between items-center">
              <p className="text-danger">Empréstimo Pinheiro</p>
              <p> -R$ 100,00</p>
            </div>
            <div className="d-flex justify-content-between items-center">
              <p className="text-danger">Aluguel RV</p>
              <p> -R$ 3240,00</p>
            </div>
          </div>

          <div className="mb-4 d-flex justify-content-between items-center">
            <span
              style={{color: "#E0972F"}}
              className="text-uppercase fw-bold"
            >
              Subtotal
            </span>
            <div>
              <p className="fw-bold">R$ {saldo.toFixed(2)}</p>
            </div>
          </div>

          {isClient && (
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              height={350}
            />
          )}
          <div className="d-grid gap-2">
            <Link href="/system/caixinha/transacao" className="btn btn-primary">
              Lançar Transação
            </Link>
            <Link href="#" className="btn btn-secondary">
              Editar Contas
            </Link>
          </div>
        </div>

        {/* Coluna 2 */}
        <div className="col-md-7">
          <div className="mb-4">
            <span className="text-uppercase fw-bold">Período</span>
            <div className="d-flex align-items-center mb-2 mt-2">
              <label htmlFor="startDate" className="me-2">
                De:
              </label>
              <input
                type="date"
                id="startDate"
                className="form-control me-2"
                style={{width: "auto"}}
                onChange={handleDateChange}
                value={from ? from.toISOString().split('T')[0] : ''}
              />
              <label htmlFor="endDate" className="me-2">
                a
              </label>
              <input
                type="date"
                id="endDate"
                className="form-control me-2"
                style={{width: "auto"}}
                onChange={handleDateChange}
                value={to ? to.toISOString().split('T')[0] : ''}
              />
              <button className="btn btn-primary"
                      onClick={handleSearch}
              >Emitir Extrato
              </button>
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              className="form-control"
            />
          </div>

          <div className="table-responsive bg-white mb-4">
            <table className="table table-striped">
              <thead className="table-dark">
              <tr>
                <th>Conta</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Referência</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
              </thead>
              <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.autor?.nome || "Desconhecido"}</td>
                  <td>{new Date(transaction.data).toLocaleDateString()}</td>
                  <td>
                    {transaction.tipo === "RECEITA" ? "+" : "-"}R${" "}
                    {parseFloat(transaction.valor).toFixed(2)}
                  </td>
                  <td>{transaction.referencia}</td>
                  <td>{transaction.tipo}</td>
                  <td>
                    <button className="btn btn-warning btn-sm">Editar</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          <div>
            {/* Adicionando o container flexível para os valores */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="text-center">
                <p className="mb-1">Entradas:</p>
                <p className="fw-bold">
                  R${" "}
                  {transactions
                    .filter((t) => t.tipo === "RECEITA")
                    .reduce((acc, t) => acc + parseFloat(t.valor), 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="mb-1">Saídas:</p>
                <p className="fw-bold">
                  R${" "}
                  {transactions
                    .filter((t) => t.tipo === "DESPESA")
                    .reduce((acc, t) => acc + parseFloat(t.valor), 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="mb-1">Pendências:</p>
                <p className="fw-bold text-danger">
                  -R${" "}
                  {transactions
                    .filter((t) => t.tipo === "PENDENCIA")
                    .reduce((acc, t) => acc + parseFloat(t.valor), 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="mb-1">Subtotal:</p>
                <p className="fw-bold text-danger">R$ {saldo.toFixed(2)}</p>
              </div>
            </div>

            {/* Botão alinhado no centro */}
            <div className="text-end">
              <button className="btn btn-primary">Emitir Relatório</button>
            </div>
          </div>
        </div>
      </div>
    </SystemTemplate>
  );
};

export default Caixinha;
