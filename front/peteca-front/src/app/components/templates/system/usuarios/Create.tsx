import Title from "@/app/components/items/system/Title";
import { faChevronLeft, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Create() {
  return (
    <>
      <div className="container-fluid">
        <Title title="Cadastrar usuário" />
        <div className="row mt-3 align-items-center">
          <div className="col-md-4">
            <div className="row justify-content-center align-items-center">
              <FontAwesomeIcon icon={faUserCircle} size="10x" />
              <button className="btn btn-primary btn-sm rounded-5 col-8 mt-3">Alterar foto</button>
            </div>
          </div>
          <div className="col-md-4 mt-md-0 mt-3">
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
          <div className="col-md-4 mt-md-0 mt-3 ">
            <strong>Permissões</strong>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Gerir documentos</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Gerir cadastros</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Gerir caixinha</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Gerir estoque</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Gerir calendário</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Visualizar caixinha</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Visualizar documentos</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Visualizar registros</label>
            </div>
            <button className="btn btn-primary btn-sm rounded-5 col-8 mt-2">Salvar</button>

          </div>
        </div>
      </div>
    </>
  );
}
