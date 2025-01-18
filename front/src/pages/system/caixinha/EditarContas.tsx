import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SystemTemplate from "../_systemtemplate";
import Title from "@/components/system/Title";

const EditarContas = () => {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da conta da URL

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    // buscar os dados da conta pelo ID e preencher os estados
    // Exemplo:
    // fetch(`/api/contas/${id}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setNome(data.nome);
    //     setDescricao(data.descricao);
    //   });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // enviar os dados atualizados para a API
    // Exemplo:
    // fetch(`/api/contas/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ nome, descricao }),
    // });
  };

  return (
    <SystemTemplate>
      <Title title={`Editar Conta ${id}`} />
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
            placeholder="Digite o nome da conta"
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
            placeholder="Digite a descrição da conta"
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
