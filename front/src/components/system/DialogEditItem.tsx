import { useState } from "react";
import { Modal } from "react-bootstrap";
import DialogDeleteItemConfirmation from "./DialogDeleteItemConfirmation";
import { Item, itemsAPI } from "@/apis/itemsAPI";

export default function DialogEditItem(props: DialogEditItemProps) {
  let itensArray = Array.from(props.itens);
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState<number | null>(null);
  const [unidadeMedida, setUnidadeMedida] = useState<string | null>(null);
  const [local, setLocal] = useState<string | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    let nomeIgual = false,
      quantidadeIgual = false,
      localIgual = false,
      unidademedidaIgual = false;

    nomeIgual = itensArray.every((item) => item.nome === itensArray[0].nome);

    quantidadeIgual = itensArray.every(
      (item) => item.quantidade === itensArray[0].quantidade
    );

    localIgual = itensArray.every((item) => item.local === itensArray[0].local);

    unidademedidaIgual = itensArray.every(
      (item) => item.unidadeMedida === itensArray[0].unidadeMedida
    );

    setNome(nomeIgual ? itensArray[0]?.nome : null);
    setQuantidade(quantidadeIgual ? itensArray[0]?.quantidade : null);
    setUnidadeMedida(unidademedidaIgual ? itensArray[0]?.unidadeMedida : null);
    setLocal(localIgual ? itensArray[0]?.local : null);
    setShow(true);
  };

  const handleEdit = () => {
    itensArray.forEach((item) => {
      itemsAPI.update(
        item.id,
        nome ?? item.nome,
        quantidade ?? item.quantidade,
        unidadeMedida ?? item.unidadeMedida,
        local ?? item.local
      );
    });
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
                value={nome ?? "..."}
                onChange={(e) => setNome(e.target.value)}
              ></input>
            </div>
            <div className="mb-3 col-lg-6">
              <label className="form-label">Local:</label>
              <input
                type="text"
                className="form-control"
                value={local ?? "..."}
                onChange={(e) => setLocal(e.target.value)}
              ></input>
            </div>
            <div className="mb-3 col-lg-6">
              <label className="form-label">Quantidade:</label>
              <input
                type="number"
                className="form-control"
                value={quantidade ?? 0}
                onChange={(e) => setQuantidade(Number(e.target.value))}
              ></input>
            </div>
            <div className="mb-3 col-lg-6">
              <label className="form-label">Unidade de medida:</label>
              <input
                type="text"
                className="form-control"
                value={unidadeMedida ?? "..."}
                onChange={(e) => setUnidadeMedida(e.target.value)}
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="container-fluid justify-content-between">
          <div className="col-lg-3 col-12">
            <button
              className="btn btn-danger btn-md rounded-5 col-12"
              onClick={handleClose}
            >
              Cancelar
            </button>
          </div>
          <div className="col-lg-4 col-12 ">
            <button
              className="btn btn-primary btn-md rounded-5 col-12"
              onClick={handleEdit}
            >
              {props.buttonText}
            </button>
          </div>
          <div className="col-lg-4 col-12">
            <DialogDeleteItemConfirmation
              onDelete={() => {
                itensArray.forEach((item) => {
                  itemsAPI.delete(item.id);
                });
                handleClose();
              }}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export interface DialogEditItemProps {
  buttonType: string;
  buttonText: string;
  title: string;
  itens: Set<Item>;
}
