import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RedefinePassword() {
  return (
    <>
      <div className="row justify-content-center align-self-center">
        <h3 className="text-warning text-center mb-3">
          REDEFINIR SENHA
        </h3>
        <div className="col-md-6 col-12">
          <div className="row justify-content-around align-self-center m-2">
            <div className="col-md-8 col-12">
              <label className="text-light d-flex justify-content-left">
                Insira a nova senha
              </label>
              <div className="input-group input-group-lg mb-3">
                <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                <input type="password" className="form-control" placeholder="**********" />
              </div>
            </div>
            <div className="col-md-8 col-12">
              <label className="text-light d-flex justify-content-left">
                Confirme sua senha
              </label>
              <div className="input-group input-group-lg mb-3">
                <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                <input type="password" className="form-control" placeholder="**********" />
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-self-center m-3">
            <button className="btn btn-primary btn-md rounded-4 p-2 col-md-8 col-12">
              Redefinir senha
            </button>
            <button className="btn btn-danger btn-md rounded-4 p-2 mt-3 col-md-8 col-12">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
