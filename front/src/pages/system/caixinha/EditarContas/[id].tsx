import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SystemTemplate from "../../_systemtemplate";
import Title from "@/components/system/Title";
import { useAccount } from "@/hooks/useAccount";

const EditarContas = () => {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da conta da URL
  const { getAccountById, updateAccount } = useAccount();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Account = await getAccountById(id as string);
        setNome(Account.nome);
        setDescricao(Account.descricao);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAccount = {
      nome,
      descricao,
    };

    try {
      updateAccount(id as string, updatedAccount);
      router.push("/system/caixinha/contas");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SystemTemplate>
      <Title title={`Editar Conta ${nome}`} />
      <form onSubmit={handleSubmit} className=" mt-4 col-md-6 mx-auto ">
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome da Conta
          </label>
          <input
            type="text"
            id="nome"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">
            Descrição
          </label>
          <textarea
            id="descricao"
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Salvar
        </button>
      </form>
    </SystemTemplate>
  );
};

export default EditarContas;
