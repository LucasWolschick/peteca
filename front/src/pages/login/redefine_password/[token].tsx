import { faLock } from "@fortawesome/free-solid-svg-icons";
import LoginTitle from "@/components/login/LoginTitle";
import LoginInput from "@/components/login/LoginInput";
import LoginButton from "@/components/login/LoginButton";
import Link from "next/link";
import LoginTemplate from "../_logintemplate";
import { useRouter } from "next/router";
import * as jwt from "jsonwebtoken";
import { UsuarioAPI } from "@/apis/usuarioAPI";
import { useEffect } from "react";

export default function RedefinePassword() {
  const router = useRouter();
  const { token } = router.query;
  const decodedToken = token && jwt.decode(token as string);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get("passwordConfirmation") as string;

    if (password !== passwordConfirmation) {
      alert("As senhas não coincidem");
      return;
    }

    UsuarioAPI.resetPassword(token as string, password)
      .then(() => {
        alert("Senha redefinida com sucesso!");
        router.push("/");
      })
      .catch(() => {
        alert(
          "Erro na redefinição de senha. Certifique-se que o token é válido."
        );
      });
  };

  return (
    <LoginTemplate>
      <form
        method="post"
        onSubmit={handleSubmit}
        className="row justify-content-center align-self-center"
      >
        <LoginTitle title="REDEFINIR SENHA" />

        <div className="col-md-6 col-12">
          <div className="row justify-content-around align-self-center m-3">
            <div className="col-md-8 col-12">
              <LoginInput
                text="Insira a nova senha"
                icon={faLock}
                placeholder="**********"
                type="password"
                id={"password"}
              />
            </div>
            <div className="col-md-8 col-12">
              <LoginInput
                text="Confirme sua senha"
                icon={faLock}
                placeholder="**********"
                type="password"
                id={"passwordConfirmation"}
              />
            </div>
          </div>
          <div className="row justify-content-center align-self-center m-3">
            <div className="col-md-8 col-12">
              <LoginButton
                text="Redefinir senha"
                class="btn-primary"
                type="submit"
              />
            </div>
            <div className="col-md-8 col-12 mt-3">
              <Link href="/">
                <LoginButton text="Cancelar" class="btn-danger" />
              </Link>
            </div>
          </div>
        </div>
      </form>
    </LoginTemplate>
  );
}
