import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginInput from "../../items/login/LoginInput";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import LoginButton from "../../items/login/LoginButton";
import LoginTitle from "../../items/login/LoginTitle";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UsuarioAPI } from "@/apis/usuarioAPI";

// LogInAndPassword is the page to login and enter the Forgot Password and Reset Password pages
export default function LoginAndPassword() {
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form as HTMLFormElement);

    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const remember = data.get('remember') !== null;

    console.log({email, password, remember});
    const result = UsuarioAPI.login(email, password, remember);
    result.then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <>
      <LoginTitle title="LOG IN" />
      <h3 className="text-light text-center fw-bolder">
        ENTRE EM SUA CONTA PARA GERIR SEU GRUPO PET
      </h3>
      <form method="post" onSubmit={handleSubmit} className="row justify-content-center align-self-center">
        <div className="col-md-6 col-12">
          <div className="row justify-content-center align-self-center m-3">
            <div className="col-md-8 col-12">
              <LoginInput id="email" text="Endereço de e-mail" icon={faEnvelope} placeholder="example@domain.com" type="email" />
            </div>
            <div className="col-md-8 col-12">
              <LoginInput id="password" text="Sua senha" icon={faLock} placeholder="**********" type="password" />
            </div>
            <div className="col-md-8 col-12">
              <div className="form-check">
                <input name="remember" id="remember" className="form-check-input" type="checkbox" value="" />
                <label className="text-light form-check-label">
                  Lembre de mim
                </label>
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-self-center m-3">
            <div className="col-md-8 col-12">
              <LoginButton text="Entrar" class="btn-primary"/>
            </div>
            <div className="col-md-8 col-12 mt-3">
              <Link to="/forgotpassword">
                <LoginButton text="Esqueci minha senha" class="btn-warning" />
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
