import { faChevronLeft, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Create() {
  return (
    <>
      <div className="container-fluid">
        <a
          className="text-warning text-decoration-none d-flex align-items-center"
          href="/"
        >
          <FontAwesomeIcon icon={faChevronLeft} size="2x" /> Voltar
        </a>
        <h1 className="text-warning">Cadastrar usuário</h1>
        <div className="row mt-3">
          <div className="col-md-4 justify-content-center align-items-center">
            <div className="row">
              <FontAwesomeIcon icon={faUserCircle} size="10x" />
              <button className="btn btn-primary btn-sm rounded-5 col-8 mt-3">Alterar foto</button>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <label>Nome</label>
              <input type="text" className="form-control-sm form-control" />
            </div>
            <div>
              <label>Data de nascimento</label>
              <input type="date" className="form-control-sm form-control" />
            </div>
            <div>
              <label>Endereço de e-mail</label>
              <input type="text" className="form-control-sm form-control" />
            </div>
            <div>
              <label>Registro acadêmico</label>
              <input type="text" className="form-control-sm form-control" />
            </div>
            <div>
              <label>Matrícula</label>
              <input type="text" className="form-control-sm form-control" />
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
}
