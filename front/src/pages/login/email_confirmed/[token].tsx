import { useRouter } from "next/router";
import LoginTemplate from "../_logintemplate";
import { useEffect, useState } from "react";
import { UsuarioAPI } from "@/apis/usuarioAPI";
import LoadingTemplate from "@/pages/_loadingTemplate";
import Link from "next/link";

export default function RedefinitionConfirmation() {
  const router = useRouter();
  const { token } = router.query;

  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (token) {
      UsuarioAPI.confirmEmail(token as string)
        .then((res) => {
          setSuccess(true);
        })
        .catch((res) => {
          setSuccess(false);
        });
    } else {
      setSuccess(false);
    }
  }, [token]);

  if (success === true) {
    return (
      <LoginTemplate>
        <h4 className="text-light text-center">
          O seu endereço de e-mail foi confirmado com sucesso!
        </h4>
        <Link href="/login">
          <div className="row justify-content-center align-self-center mt-5">
            <button className="btn btn-primary btn-md rounded-5 p-2 col-md-3 col-8">
              Voltar para login
            </button>
          </div>
        </Link>
      </LoginTemplate>
    );
  } else if (success === false) {
    return (
      <LoginTemplate>
        <h4 className="text-light text-center">
          Não foi possível validar o seu endereço de email. Verifique se o link
          utilizado está correto.
        </h4>
        <Link href="/login">
          <div className="row justify-content-center align-self-center mt-5">
            <button className="btn btn-primary btn-md rounded-5 p-2 col-md-3 col-8">
              Voltar para login
            </button>
          </div>
        </Link>
      </LoginTemplate>
    );
  } else if (success === undefined) {
    return (
      <LoginTemplate>
        <LoadingTemplate />
      </LoginTemplate>
    );
  }
}
