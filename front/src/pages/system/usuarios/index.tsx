import CardUserList from "@/components/system/CardUserList";
import Title from "@/components/system/Title";
import SystemTemplate from "../_systemtemplate";
import { useEffect, useState } from "react";
import { UsuarioAPI } from "@/apis/usuarioAPI";
import { useRouter } from "next/router";

interface User {
  id: number;
  nome: string;
  email: string;
  data_nascimento: Date;
  imagem: string;
}

// This page list the users of the system
// In this page, you can be redirected to the Create page, creating or editing a user
export default function List() {
  const [users, setUsers] = useState(undefined as undefined | User[]);
  const router = useRouter();

  useEffect(() => {
    UsuarioAPI.getAllUsers()
      .then((response) => {
        setUsers(
          response.data.map(
            (user) =>
              ({
                id: user.id,
                nome: user.nome,
                email: user.email,
                data_nascimento: user.data_nascimento,
                imagem: user.imagem,
              } as User)
          )
        );
      })
      .catch((error) => {
        console.log(error);
        setUsers([] as User[]);
      });
  }, []);

  return (
    <SystemTemplate>
      <div className="container-fluid">
        <Title title="Usuários" />
        <div className="row mt-3 align-items-center justify-content-center overflow-auto ">
          <div className="col-md-8 col-12 overflow-auto">
            <div
              data-bs-spy="scroll"
              data-bs-target="#list-example"
              data-bs-smooth-scroll="true"
              className="scrollspy-example bg-light-gray border-0 rounded-0 gap-3"
            >
              {users ? (
                users.map((user) => {
                  return (
                    <CardUserList
                      name={user.nome}
                      email={user.email}
                      key={user.id}
                      viewUser={() => {
                        router.push("/system/usuarios/details/" + user.id);
                      }}
                      editUser={() => {
                        router.push("/system/usuarios/create/" + user.id);
                      }}
                    />
                  );
                })
              ) : (
                <div className="text-center">Carregando...</div>
              )}
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-md-8 col-12">
            <button className="btn btn-primary btn-sm rounded-5">
              Cadastrar usuário
            </button>
          </div>
        </div>
      </div>
    </SystemTemplate>
  );
}
