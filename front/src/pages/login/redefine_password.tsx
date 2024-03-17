import { faLock } from "@fortawesome/free-solid-svg-icons";
import LoginTitle from "@/components/login/LoginTitle";
import LoginInput from "@/components/login/LoginInput";
import LoginButton from "@/components/login/LoginButton";
import LoginTemplate from "./_logintemplate";
import Link from "next/link";

export default function RedefinePassword() {

  return (
    <LoginTemplate>
      <div className="row justify-content-center align-self-center">
        <LoginTitle title="REDEFINIR SENHA" />

        <div className="col-md-6 col-12">
          <div className="row justify-content-around align-self-center m-3">
            <div className="col-md-8 col-12">
            <LoginInput text="Insira a nova senha" icon={faLock} placeholder="**********" type="password" id={""}/>
            </div>
            <div className="col-md-8 col-12">
            <LoginInput text="Confirme sua senha" icon={faLock} placeholder="**********" type="password" id={""}/>
            </div>
          </div>
          <div className="row justify-content-center align-self-center m-3">
            <div className="col-md-8 col-12">
              <LoginButton text="Redefinir senha" class="btn-primary"/>
            </div>
            <div className="col-md-8 col-12 mt-3">
              <Link href="/">
                <LoginButton text="Cancelar" class="btn-danger" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LoginTemplate>
  );
}
