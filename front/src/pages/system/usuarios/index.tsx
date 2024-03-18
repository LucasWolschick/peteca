import CardUserList from "@/components/system/CardUserList";
import Title from "@/components/system/Title";
import SystemTemplate from "../_systemtemplate";
import { useContext, useEffect, useState } from "react";
import { UsuarioAPI } from "@/apis/usuarioAPI";
import { useRouter } from "next/router";
import Link from "next/link";
import { SystemContext } from "@/SystemContext";
import { AuthContext } from "@/AuthContext";

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
  const loggedUser = useContext(AuthContext).loggedUser;
  const canEdit =
    loggedUser?.userPermissions.includes("admin") ||
    loggedUser?.userPermissions.includes("Gerir Cadastros");

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
        console.error(error);
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
                      editUser={
                        canEdit
                          ? () => {
                              router.push("/system/usuarios/edit/" + user.id);
                            }
                          : undefined
                      }
                    />
                  );
                })
              ) : (
                // spiiners
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {canEdit && (
          <div className="row justify-content-center mt-3">
            <div className="col-md-8 col-12">
              <Link href="/system/usuarios/edit/new">
                <button className="btn btn-primary btn-sm rounded-5">
                  Cadastrar usuário
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </SystemTemplate>
  );
}
