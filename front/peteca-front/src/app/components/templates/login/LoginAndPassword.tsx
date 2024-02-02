import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginInput from "../../items/login/LoginInput";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import LoginButton from "../../items/login/LoginButton";
import LoginTitle from "../../items/login/LoginTitle";

// LogInAndPassword is the page to login and enter the Forgot Password and Reset Password pages
export default function LoginAndPassword() {
  return (
    <>
      <LoginTitle title="LOG IN" />
      <h3 className="text-light text-center fw-bolder">
        ENTRE EM SUA CONTA PARA GERIR SEU GRUPO PET
      </h3>
      <div className="row justify-content-center align-self-center">
        <div className="col-md-6 col-12">
          <div className="row justify-content-center align-self-center m-3">
            <div className="col-md-8 col-12">
              <LoginInput text="Endereço de e-mail" icon={faEnvelope} placeholder="example@domain.com" type="email" />
            </div>
            <div className="col-md-8 col-12">
              <LoginInput text="Sua senha" icon={faLock} placeholder="**********" type="password" />
            </div>
            <div className="col-md-8 col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
                <label className="text-light form-check-label">
                  Lembre de mim
                </label>
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-self-center m-3">
            <div className="col-md-8 col-12">
              <LoginButton text="Entrar" class="btn-primary" />
            </div>
            <div className="col-md-8 col-12 mt-3">
              <LoginButton text="Esqueci minha senha" class="btn-warning" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
