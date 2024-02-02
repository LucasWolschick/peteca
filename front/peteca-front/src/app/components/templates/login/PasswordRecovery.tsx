import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import LoginInput from "../../items/login/LoginInput";
import LoginTitle from "../../items/login/LoginTitle";
import LoginButton from "../../items/login/LoginButton";

export default function PasswordRecovery() {
  return (
    <>
      <LoginTitle title="ESQUECI MINHA SENHA" />
      <div>
        <h3 className="text-light text-center fw-bolder">
          INSIRA SEU ENDEREÇO DE E-MAIL PARA QUE POSSAMOS ENVIAR UM E-MAIL DE RECUPERAÇÃO
        </h3>
      </div>
      <div className="row justify-content-center align-self-center">
        <div className="col-md-6 col-12">
          <div className="row justify-content-center align-self-center m-3">
            <div className="col-md-8 col-12">
              <LoginInput text="Endereço de e-mail" icon={faEnvelope} placeholder="example@domain.com" type="email" />
            </div>
          </div>
          <div className="row justify-content-center align-self-center m-3">
            <div className="col-md-8 col-12">
              <LoginButton text="Enviar" class="btn-primary" />
            </div>
            <div className="col-md-8 col-12 mt-3">
              <LoginButton text="Voltar" class="btn-danger" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
