import React, { useEffect, useState } from "react";
import Link from "next/link";
import SystemTemplate from "@/pages/system/_systemtemplate";
import Title from "@/components/system/Title";
import { Conta, accountAPI } from "@/apis/accountAPI";
import Dialog from "@/components/system/Dialog";

const Contas = () => {
  const [accounts, setAccounts] = useState<Conta[]>([]);

  useEffect(() => {
    const getAllAccounts = async () => {
      const response = await accountAPI.getAccounts();
      setAccounts(response.data);
    };
    getAllAccounts();
  }, []);

  const handleConfirmDelete = async (id: number) => {
    await accountAPI.deleteAccount(id);
    const updatedAccounts = (await accountAPI.getAccounts()).data;
    setAccounts(updatedAccounts);
  };

  return (
    <SystemTemplate>
      <Title title="Contas Bancárias" />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12 mb-4">
            <Link
              href="/system/caixinha/contas/new"
              className="btn btn-success mb-2"
            >
              Adicionar Nova Conta
            </Link>
            <h4 className="mt-4">Lista de Contas</h4>
            <table className="table table-striped table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td>{account.nome}</td>
                    <td>
                      <Link
                        href={`/system/caixinha/contas/edit/${account.id}`}
                        className="btn btn-primary btn-sm me-2 mb-2"
                      >
                        Editar
                      </Link>
                      <Dialog
                        text={`Tem certeza que deseja remover a conta "${account.nome}"? Isso também irá deletar todas as transações associadas.`}
                        buttonText="Deletar"
                        onConfirm={() => handleConfirmDelete(account.id)}
                        className="btn btn-danger btn-sm me-2 mb-2"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SystemTemplate>
  );
};

export default Contas;
