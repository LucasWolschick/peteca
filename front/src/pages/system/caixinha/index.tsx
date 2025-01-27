import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SystemTemplate from "@/pages/system/_systemtemplate";
import Title from "@/components/system/Title";
import Link from "next/link";
import { useTransaction } from "@/hooks/useTransaction";
import { useAccount } from "@/hooks/useAccount";
import { useUser } from "@/hooks/useUser";
import jsPDF from "jspdf";
import "jspdf-autotable";
import router from "next/router";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Caixinha = () => {
  const {
    transactions,
    getAllTransactions,
    generateReport,
    downloadReport,
    generateStatement,
    downloadStatement,
  } = useTransaction();

  const { accounts, getAllAccounts } = useAccount();
  const { user, getUser } = useUser();
  const [isClient, setIsClient] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendencias, setPendencias] = useState<any[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.id === "startDate") {
      setFrom(value ? new Date(value) : null);
    } else if (e.target.id === "endDate") {
      setTo(value ? new Date(value) : null);
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const search = searchTerm.toLowerCase();
    return (
      transaction.autor?.nome?.toLowerCase().includes(search) ||
      transaction.referencia.toLowerCase().includes(search) ||
      transaction.tipo.toLowerCase().includes(search)
    );
  });

  const handleEmitirRelatorio = async () => {
    if (!from || !to) {
      alert("Por favor, selecione o período para emitir o relatório");
      return;
    }

    try {
      const fromDate = from.toISOString().split("T")[0];
      const toDate = to.toISOString().split("T")[0];
      const reportUrl = await generateReport(fromDate, toDate);
      await downloadReport(reportUrl);
      console.log(reportUrl);
    } catch (error) {
      console.log("Erro ao gerar relatório:", error);
      alert("Erro ao gerar relatório");
    }
  };

  const handleEmitirExtrato = async () => {
    try {
      const fromDate = from?.toISOString().split("T")[0];
      const toDate = to?.toISOString().split("T")[0];
      const statementUrl = await generateStatement(
        fromDate,
        toDate,
        searchTerm
      );
      await downloadStatement(statementUrl);
      console.log(statementUrl);
    } catch (error) {
      console.log("Erro ao gerar extrato:", error);
      alert("Erro ao gerar extrato");
    }
  };

  const [chartData, setChartData] = useState<{
    series: { name: string; data: number[] }[];
    options: {
      chart: {
        type: "line";
        toolbar: { show: boolean };
        style: { fontFamily: string; color: string };
        background: "transparent";
      };
      xaxis: {
        categories: string[];
        style: { fontSize: string; color: string };
      };
      yaxis: {
        labels: { style: { colors: string } };
      };
      theme: { mode: "dark" };
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
        background: "transparent",
      },
      theme: {
        mode: "dark",
      },
      xaxis: {
        categories: [], // Categorias do eixo x
        style: {
          fontSize: "14px",
          color: "#fff",
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
          },
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
      await Promise.allSettled([
        getAllTransactions(),
        getAllAccounts(),
        getUser(),
      ]);
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
          { ...prevData.series[0], data: entradas },
          { ...prevData.series[1], data: saidas },
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

    const filtrarPendencias = () => {
      const pendencias = transactions.filter(
        (transaction) => transaction.tipo === "PENDENCIA"
      );
      setPendencias(pendencias);
    };

    filtrarPendencias();
    calculateSaldo();
    updateChartData();
  }, [transactions]);

  return (
    <SystemTemplate>
      <Title title="Caixinha" backRoute="/system/inicio" />
      <div className="d-flex flex-column flex-md-row justify-content-between gap-4">
        {/* Coluna 1 */}
        <div className="col-md-4 mb-4">
          <div className="mb-4">
            <span
              className="text-uppercase fw-bold"
              style={{ color: "#E0972F" }}
            >
              Saldo
            </span>
            <h1 className="display-5">R$ {saldo.toFixed(2)}</h1>
          </div>
          <div className="mb-4">
            <span
              style={{ color: "#E0972F" }}
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
              style={{ color: "#E0972F" }}
              className="text-uppercase fw-bold"
            >
              Pendências
            </span>
            {pendencias.map((pendencia) => (
              <div
                className="d-flex justify-content-between items-center"
                key={pendencia.id}
              >
                <p className="text-danger">{pendencia.referencia}</p>
                <p> -R$ {parseFloat(pendencia.valor).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="mb-4 d-flex justify-content-between items-center">
            <span
              style={{ color: "#E0972F" }}
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
            <Link
              href="/system/caixinha/transacoes/new"
              className="btn btn-primary"
            >
              Lançar Transação
            </Link>
            <Link href="/system/caixinha/contas" className="btn btn-secondary">
              Editar Contas
            </Link>
          </div>
        </div>

        {/* Coluna 2 */}
        <div className="col-md-7 col-12">
          <div className="mb-4">
            <span className="text-uppercase fw-bold">Período</span>
            <div className="row align-items-center mb-2 mt-2">
              <div className="col-lg-6">
                <label htmlFor="startDate" className="me-2">
                  De:
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="form-control me-2"
                  onChange={handleDateChange}
                  value={from ? from.toISOString().split("T")[0] : ""}
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="endDate" className="me-2">
                  a
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="form-control me-2"
                  onChange={handleDateChange}
                  value={to ? to.toISOString().split("T")[0] : ""}
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              className="form-control"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={handleEmitirExtrato}
            >
              Emitir Extrato
            </button>
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
                {filteredTransactions.map((transaction) => (
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
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          router.push(
                            `/system/caixinha/contas/edit/${transaction.id}`
                          )
                        }
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            {/* Adicionando o container flexível para os valores */}
            <div className="row justify-content-between align-items-center mb-3">
              <div className="text-center col-md-6">
                <p className="mb-1">Entradas:</p>
                <p className="fw-bold">
                  R${" "}
                  {transactions
                    .filter((t) => t.tipo === "RECEITA")
                    .reduce((acc, t) => acc + parseFloat(t.valor), 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="text-center col-md-6">
                <p className="mb-1">Saídas:</p>
                <p className="fw-bold">
                  R${" "}
                  {transactions
                    .filter((t) => t.tipo === "DESPESA")
                    .reduce((acc, t) => acc + parseFloat(t.valor), 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="text-center col-md-6">
                <p className="mb-1">Pendências:</p>
                <p className="fw-bold text-danger">
                  -R${" "}
                  {transactions
                    .filter((t) => t.tipo === "PENDENCIA")
                    .reduce((acc, t) => acc + parseFloat(t.valor), 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="text-center col-md-6">
                <p className="mb-1">Subtotal:</p>
                <p className="fw-bold text-danger">R$ {saldo.toFixed(2)}</p>
              </div>
            </div>

            {/* Botão alinhado no centro */}
            <div className="text-center">
              <button
                className="btn btn-primary"
                onClick={handleEmitirRelatorio}
              >
                Emitir Relatório
              </button>
            </div>
          </div>
        </div>
      </div>
    </SystemTemplate>
  );
};

export default Caixinha;
