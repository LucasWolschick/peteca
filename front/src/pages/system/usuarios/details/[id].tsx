import Title from "@/components/system/Title";
import {
  faCheck,
  faUserCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SystemTemplate from "../../_systemtemplate";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { User, UsuarioAPI } from "@/apis/usuarioAPI";
import { SystemContext } from "@/SystemContext";
import { Permission, PermissionsAPI } from "@/apis/permissionsAPI";

function Permissao({ nome, possui }: { nome: Permission; possui: boolean }) {
  return (
    <tr>
      <td>{nome}</td>
      <td>
        <FontAwesomeIcon icon={possui ? faCheck : faXmark} />
      </td>
    </tr>
  );
}

// This page gets the informations about one user
// It shows profile picture, name, e-mail, born date and all the permissions the user has
export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(undefined as undefined | User);
  const [userPermissions, setUserPermissions] = useState([] as Permission[]);
  const allPermissions = useContext(SystemContext).permissions;

  useEffect(() => {
    if (!id) return;
    const nId = Number(id);
    if (!isNaN(nId)) {
      UsuarioAPI.getUserById(nId)
        .then((response) => {
          setUser(response.data);
          return PermissionsAPI.getUserPermissions(nId);
        })
        .then((perms) => {
          setUserPermissions(perms.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  if (!user) {
    return (
      <SystemTemplate>
        <div className="container-fluid">
          <Title title="Usuário" />
        </div>
        <div>
          <p>Carregando...</p>
        </div>
      </SystemTemplate>
    );
  }

  return (
    <SystemTemplate>
      <div className="container-fluid">
        <Title title="Usuário" />
      </div>
      <div className="row mt-3 align-items-center">
        <div className="col-md-3">
          <div className="row justify-content-center justify-content-lg-start">
            {/* <div className="profile-picture"></div> */}
            <FontAwesomeIcon icon={faUserCircle} size="10x" />
          </div>
        </div>
        <div className="col-md-9 mt-3 mt-md-0">
          <h1 className="fw-bolder">{user.nome}</h1>
          <p>{user.email}</p>
          <p>{user.data_nascimento.toLocaleDateString()}</p>
        </div>

        <div className="mt-3">
          <table className="table table-responsive table-sm">
            <tbody>
              {allPermissions.map((perm) => {
                return (
                  <Permissao
                    key={perm}
                    nome={perm}
                    possui={userPermissions.includes(perm)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </SystemTemplate>
  );
}
