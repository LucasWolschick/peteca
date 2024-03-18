import { useState } from "react";
import Modal from "react-bootstrap/Modal";

// Global dialog + button that opens it that pops in the center of the screen
// Has a confirm and cancel button
// Has props, button text and the text of the dialog
export default function Dialog(props: DialogProps) {
  const [show, setShow] = useState(false);

  const handleClose = (e: any) => {
    e.preventDefault();
    setShow(false);
  };
  const handleShow = (e: any) => {
    e.preventDefault();
    setShow(true);
  };
  const handleConfirm = (e: any) => {
    e.preventDefault();
    props.onConfirm();
    setShow(false);
  };

  return (
    <>
      <button
        className="btn btn-danger btn-sm rounded-5 col-lg-8 col-md-12 col-8"
        onClick={handleShow}
      >
        {props.buttonText}
      </button>

      <Modal
        centered
        show={show}
        onHide={() => handleClose}
        backdrop="static"
        keyboard={false}
        className="rounded-5"
      >
        <Modal.Body>{props.text}</Modal.Body>
        <Modal.Footer className="container-fluid justify-content-between">
          <div className="col-lg-5 col-12">
            <button
              className="btn btn-danger btn-md rounded-5 col-12"
              onClick={handleClose}
            >
              Cancelar
            </button>
          </div>
          <div className="col-lg-5 col-12">
            <button
              className="btn btn-primary btn-md rounded-5 col-12"
              onClick={handleConfirm}
            >
              {props.buttonText}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export interface DialogProps {
  text: string;
  buttonText: string;
  onConfirm: () => void;
}
