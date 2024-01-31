// LogInAndPassword is the page to login and enter the Forgot Password and Reset Password pages
export default function LoginAndPassword() {
  return (
    <>
      <div>
        <h3 className="text-warning d-flex justify-content-center align-self-center">
          LOG IN
        </h3>
      </div>
      <div>
        <h3 className="text-light d-flex justify-content-center align-self-center">
          ENTRE EM SUA CONTA PARA GERIR SEU GRUPO PET
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
            <div className="col-8">
              <input
                type="password"
                placeholder="Senha"
                className="form-control form-control-md p-3"
              />
            </div>
            <div className="col-8 mt-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value=""/>
                <label className="text-light form-check-label">
                  Lembre de mim
                </label>
              </div>
            </div>    
          </div>
          <div className="row justify-content-center align-self-center m-3">
            <button className="btn btn-primary btn-md rounded-4 p-2 mb-2 col-8">
              Entrar
            </button>
            <button className="btn btn-primary btn-md rounded-4 p-2 col-8">
              Esqueci minha senha
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
