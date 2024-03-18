import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import LoginTitle from "@/components/login/LoginTitle";
import LoginInput from "@/components/login/LoginInput";
import LoginButton from "@/components/login/LoginButton";
import LoginTemplate from "./_logintemplate";
import Link from "next/link";
import { UsuarioAPI } from "@/apis/usuarioAPI";
import { useRouter } from "next/router";

export default function PasswordRecovery() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    UsuarioAPI.passwordRecovery(email).catch((_) => {});
    alert(
      "Enviamos um email de recuperação para o endereço informado. Confira sua caixa de entrada."
    );
    router.push("/");
  };

  return (
    <LoginTemplate>
      <LoginTitle title="ESQUECI MINHA SENHA" />
      <div>
        <h3 className="text-light text-center fw-bolder">
          INSIRA SEU ENDEREÇO DE E-MAIL PARA QUE POSSAMOS ENVIAR UM E-MAIL DE
          RECUPERAÇÃO
        </h3>
      </div>
      <form
        method="post"
        onSubmit={handleSubmit}
        className="row justify-content-center align-self-center"
      >
        <div className="col-md-6 col-12">
          <div className="row justify-content-center align-self-center m-3">
            <div className="col-md-8 col-12">
              <LoginInput
                text="Endereço de e-mail"
                icon={faEnvelope}
                placeholder="example@domain.com"
                type="email"
                id={"email"}
              />
            </div>
          </div>
          <div className="row justify-content-center align-self-center m-3">
            <div className="col-md-8 col-12">
              <LoginButton text="Enviar" class="btn-primary" type="submit" />
            </div>
            <div className="col-md-8 col-12 mt-3">
              <Link href="/">
                <LoginButton text="Voltar" class="btn-danger" />
              </Link>
            </div>
          </div>
        </div>
      </form>
    </LoginTemplate>
  );
}
