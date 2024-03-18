// The component User shows a photo of the current logged user in the system, with a <a> tag

import { AuthContext } from "@/AuthContext";
import { UsuarioAPI } from "@/apis/usuarioAPI";
import { faRightFromBracket, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext } from "react";

// The <a> tag goes to logout
export default function User() {
  const { loggedUser, setLoggedUser } = useContext(AuthContext);
  if (!loggedUser) return null;

  return (
    <div className="d-flex flex-row justify-content-between align-items-center text-purple text-decoration-none p-md-3 mt-3 mt-md-0 mb-3 mb-md-0s">
      {/* <img
        src="https://github.com/mdo.png"
        alt=""
        width="40"
        height="40"
        className="rounded-circle me-2"
      /> */}
      <FontAwesomeIcon icon={faUserCircle} size="3x" />

      <div className="d-flex flex-column ms-2">
        <b>{loggedUser.user.nome}</b>
        <Link
          href={"/login"}
          onClick={() => {
            UsuarioAPI.logout().catch(() => { });
            setLoggedUser(null);
          }}
          className="text-decoration-none text-purple"
        >
          Logout
          <FontAwesomeIcon icon={faRightFromBracket} className="ms-2"/>
        </Link>
      </div>
    </div>
  );
}
