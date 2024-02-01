export default function RedefinePassword() {
  return (
    <>
      <div>
        <h3 className="text-warning d-flex justify-content-center align-self-center">
          REDEFINIR SENHA
        </h3>
      </div>
      <div className="row justify-content-center align-self-center">
        <div className="col-6">
          <div className="row justify-content-center align-self-center m-2">
            <div className="col-8">
              <h5 className="text-light d-flex justify-content-left">
                INSIRA A NOVA SENHA
              </h5>
              <input
                type="text"
                placeholder="nova senha"
                className="form-control form-control-md p-3 mb-3"
              />
            </div>
            <div className="col-8">
              <h5 className="text-light d-flex justify-content-left">
                CONFIRME A NOVA SENHA
              </h5>
              <input
                type="text"
                placeholder="confirmar nova senha"
                className="form-control form-control-md p-3"
              />
            </div>  
          </div>
          <div className="row justify-content-center align-self-center m-3">
            <button className="btn btn-primary btn-md rounded-4 p-2 mb-2 col-8">
              Entrar
            </button>
            <button className="btn btn-danger btn-md rounded-4 p-2 col-8">
              Esqueci minha senha
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
