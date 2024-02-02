import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginInput from "../../items/login/LoginInput";
import LoginButton from "../../items/login/LoginButton";
import LoginTitle from "../../items/login/LoginTitle";

export default function RedefinePassword() {
  return (
    <>
      <div className="row justify-content-center align-self-center">
        <LoginTitle title="REDEFINIR SENHA" />

        <div className="col-md-6 col-12">
          <div className="row justify-content-around align-self-center m-3">
            <div className="col-md-8 col-12">
              <LoginInput text="Insira a nova senha" icon={faLock} placeholder="**********" type="password" />
            </div>
            <div className="col-md-8 col-12">
              <LoginInput text="Confirme sua senha" icon={faLock} placeholder="**********" type="password" />
            </div>
          </div>
          <div className="row justify-content-center align-self-center m-3">
            <div className="col-md-8 col-12">
              <LoginButton text="Redefinir senha" class="btn-primary" />
            </div>
            <div className="col-md-8 col-12 mt-3">
              <LoginButton text="Cancelar" class="btn-danger" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
