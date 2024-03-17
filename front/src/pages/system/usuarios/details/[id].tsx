import Title from "@/components/system/Title";
import {
  faCheck,
  faUserCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SystemTemplate from "../../_systemtemplate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User, UsuarioAPI } from "@/apis/usuarioAPI";

// This page gets the informations about one user
// It shows profile picture, name, e-mail, born date and all the permissions the user has
export default function Details() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return null;
  }

  const [user, setUser] = useState(undefined as undefined | User);
  useEffect(() => {
    const nId = Number(id);
    if (!isNaN(nId)) {
      UsuarioAPI.getUserById(nId)
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  if (!user) {
    return null;
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
              <tr>
                <td>Gerir documentos</td>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
              </tr>
              <tr>
                <td>Gerir cadastros</td>
                <td>
                  <FontAwesomeIcon icon={faXmark} />
                </td>
              </tr>
              <tr>
                <td>Gerir caixinha</td>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
              </tr>
              <tr>
                <td>Gerir estoque</td>
                <td>
                  <FontAwesomeIcon icon={faXmark} />
                </td>
              </tr>
              <tr>
                <td>Gerir calendário</td>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
              </tr>
              <tr>
                <td>Visualizar caixinha</td>
                <td>
                  <FontAwesomeIcon icon={faXmark} />
                </td>
              </tr>
              <tr>
                <td>Visualizar documentos</td>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
              </tr>
              <tr>
                <td>Visualizar registros</td>
                <td>
                  <FontAwesomeIcon icon={faXmark} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SystemTemplate>
  );
}
