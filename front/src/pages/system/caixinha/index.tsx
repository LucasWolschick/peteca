import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import SystemTemplate from "../_systemtemplate";
import Title from "@/components/system/Title";
import Link from "next/link";

const Chart = dynamic(() => import("react-apexcharts"), {ssr: false});

const Caixinha = () => {
  const [isClient, setIsClient] = useState(false);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Entradas",
        data: [500, 700, 1000, 1200, 1500], // Dados do gráfico
      },
      {
        name: "Saídas",
        data: [300, 400, 800, 900, 1000],
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
        }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May"], // Categorias do eixo x
        style: {
          fontSize: "14px",
          color: "#fff",
        }
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

  return (
    <SystemTemplate>
      <Title title="Caixinha"/>
      <div className="d-flex flex-column flex-md-row justify-content-between gap-4">
        {/* Coluna 1 */}
        <div className="col-md-4 mb-4">
          <div className="mb-4">
            <span className="text-uppercase fw-bold" style={{color: "#E0972F"}}>
              Saldo
            </span>
            <h1 className="display-5">R$ 4321,90</h1>
          </div>
          <div className="mb-4">
            <span style={{color: "#E0972F"}} className="text-uppercase fw-bold">
              Contas
            </span>
            <div className="d-flex justify-content-between items-center">
              <p>Conta Caixa</p>
              <p>R$ 7701,01</p>
            </div>
            <div className="d-flex justify-content-between items-center">
              <p>Poupança BB</p>
              <p>R$ 20,21</p>
            </div>
            <div className="d-flex justify-content-between items-center">
              <p>Dinheiro</p>
              <p>R$ 0,00</p>
            </div>
          </div>
          <div className="mb-4">
            <span style={{color: "#E0972F"}} className="text-uppercase fw-bold">
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
            <span style={{color: "#E0972F"}} className="text-uppercase fw-bold">
              Subtotal
            </span>
            <div>
              <p className="fw-bold">R$ 4321,90</p>
            </div>
          </div>

          {isClient && (
            <Chart options={chartData.options} series={chartData.series} type="line" height={350}/>
          )}
          <div className="d-grid gap-2">
            <Link href="/system/transacao" className="btn btn-primary">
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
              <input type="date" id="startDate" className="form-control me-2" style={{width: "auto"}}/>
              <label htmlFor="endDate" className="me-2">
                a
              </label>
              <input type="date" id="endDate" className="form-control me-2" style={{width: "auto"}}/>
              <button className="btn btn-primary">Emitir Extrato</button>
            </div>
            <input type="text" placeholder="Buscar..." className="form-control"/>
          </div>

          <div className="table-responsive bg-white mb-4">
            <table className="table table-striped">
              <thead className="table-dark">
              <tr>
                <th>Autor</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Referência</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Lucas</td>
                <td>01/01/2022</td>
                <td>+R$ 1000,00</td>
                <td>Custeio</td>
                <td>Entrada</td>
                <td>
                  <button className="btn btn-warning btn-sm">Editar</button>
                </td>
              </tr>
              <tr>
                <td>Eduarda</td>
                <td>02/01/2022</td>
                <td>-R$ 500,00</td>
                <td>Confraternização</td>
                <td>Saída</td>
                <td>
                  <button className="btn btn-warning btn-sm">Editar</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div>
            {/* Adicionando o container flexível para os valores */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="text-center">
                <p className="mb-1">Entradas:</p>
                <p className="fw-bold">R$ 1700,01</p>
              </div>
              <div className="text-center">
                <p className="mb-1">Saídas:</p>
                <p className="fw-bold">R$ 1500,00</p>
              </div>
              <div className="text-center">
                <p className="mb-1">Pendências:</p>
                <p className="fw-bold text-danger">-R$ 300,00</p>
              </div>
              <div className="text-center">
                <p className="mb-1">Subtotal:</p>
                <p className="fw-bold text-danger">-R$ 500,00</p>
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