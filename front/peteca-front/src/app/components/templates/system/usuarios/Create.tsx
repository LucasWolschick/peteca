import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
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
        <div className="row">
          <div className="col-4">

          </div>
          <div className="col-4">
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
          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
}
