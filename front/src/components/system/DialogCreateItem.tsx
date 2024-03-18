import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function DialogCreateItem(props: DialogCreateItemProps) {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [unidadeMedida, setUnidadeMedida] = useState("");
  const [local, setLocal] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreate = () => {
    props.onCreate({ nome, quantidade, unidadeMedida, local });
    handleClose();
  };

  return (
    <>
      <button
        className={`btn ${props.buttonType} btn-sm rounded-5 col-lg-4 col-md-5 col-10 mt-2 mt-md-0`}
        onClick={handleShow}
      >
        {props.buttonText}
      </button>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="rounded-5"
      >
        <Modal.Title className="text-center">{props.title}</Modal.Title>
        <Modal.Body>
          <div className="row">
            <div className="mb-3 col-lg-6">
              <label className="form-label">Nome:</label>
              <input
                type="text"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              ></input>
            </div>
            <div className="mb-3 col-lg-6">
              <label className="form-label">Local:</label>
              <input
                type="text"
                className="form-control"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              ></input>
            </div>
            <div className="mb-3 col-lg-6">
              <label className="form-label">Quantidade:</label>
              <input
                type="number"
                className="form-control"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
              ></input>
            </div>
            <div className="mb-3 col-lg-6">
              <label className="form-label">Unidade de medida:</label>
              <input
                type="text"
                className="form-control"
                value={unidadeMedida}
                onChange={(e) => setUnidadeMedida(e.target.value)}
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="container-fluid justify-content-between">
          <div className="col-lg-5 col-12">
            <button
              className="btn btn-danger btn-md rounded-5 col-12"
              onClick={handleClose}
            >
              Cancelar
            </button>
          </div>
          <div className="col-lg-5 col-12 ">
            <button
              className="btn btn-primary btn-md rounded-5 col-12"
              onClick={handleCreate}
            >
              Salvar
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export interface DialogCreateItemProps {
  title: string;
  buttonType: string;
  buttonText: string;
  text: string;
  refresh: () => void;
  onCreate: (item: {
    nome: string;
    quantidade: number;
    unidadeMedida: string;
    local: string;
  }) => void;
}
