export default function PasswordRecovery() {
  return (
    <>
      <div>
        <h3 className="text-warning d-flex justify-content-center align-self-center">
          ESQUECI MINHA SENHA
        </h3>
      </div>
      <div>
        <h3 className="text-light d-flex justify-content-center align-self-center">
          INSIRA SEU ENDEREÇO DE E-MAIL PARA QUE POSSAMOS ENVIAR UM E-MAIL DE RECUPERAÇÃO
        </h3>
      </div>
      <div className="row justify-content-center align-self-center">
        <div className="col-6">
          <div className="row justify-content-center align-self-center m-3">
            <div className="col-8">
              <input
                type="text"
                placeholder="E-mail"
                className="form-control form-control-md p-3 mb-3"
              />
            </div>  
          </div>
          <div className="row justify-content-center align-self-center m-3">
            <button className="btn btn-primary btn-md rounded-4 mb-2 col-8">
              Enviar
            </button>
            <button className="btn btn-primary btn-md rounded-4 col-8">
              Voltar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
