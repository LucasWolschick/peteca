import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import { UsuarioAPI } from "@/apis/usuarioAPI";
import { AuthContext } from "@/AuthContext";
import LoginTitle from "@/components/login/LoginTitle";
import LoginInput from "@/components/login/LoginInput";
import LoginButton from "@/components/login/LoginButton";
import LoginTemplate from "./_logintemplate";
import Link from "next/link";
import { useRouter } from "next/router";


// LogInAndPassword is the page to login and enter the Forgot Password and Reset Password pages
export default function LoginAndPassword() {

  const router = useRouter()
  const { setLoggedUser } = useContext(AuthContext);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    const form = e.target;
    const data = new FormData(form as HTMLFormElement);

    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const remember = data.get('remember') !== null;

    try {
      const result = await UsuarioAPI.login(email, password, remember);
      setLoggedUser({
        token: result.data.token.token,
        user: {
          id: result.data.user.id,
          nome: result.data.user.nome,
          email: result.data.user.email,
        },
      });
      router.push("/system");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <LoginTemplate>
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
              <Link href="/login/recover_password">
                <LoginButton text="Esqueci minha senha" class="btn-warning" />
              </Link>
            </div>
            <div className={`toast ${showToast ? 'show' : ''} mt-3 bg-danger text-white`} role="alert" aria-live="assertive" aria-atomic="true">
              <div className="toast-body d-flex justify-content-between align-items-center">
                Login ou senha inválidos.
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToast(false)}></button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </LoginTemplate>
  );
}
