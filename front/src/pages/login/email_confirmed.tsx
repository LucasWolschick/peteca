import LoginTemplate from "./_logintemplate";

export default function RedefinitionConfirmation() {
  return (
    <LoginTemplate>
      <h4 className="text-light text-center">
        O seu endereço de e-mail foi confirmado com sucesso!
      </h4>
      <div className="row justify-content-center align-self-center mt-5">
        <button className="btn btn-primary btn-md rounded-5 p-2 col-md-3 col-8">
          Voltar para login
        </button>
      </div>
    </LoginTemplate>
  );
}
