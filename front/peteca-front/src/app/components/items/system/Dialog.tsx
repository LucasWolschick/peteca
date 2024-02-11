import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Dialog(props: DialogProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-danger btn-sm rounded-5 col-8" onClick={handleShow}>
        {props.buttonText}
      </button>

      <Modal centered show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false} className='rounded-5'>
        <Modal.Body>{props.text}</Modal.Body>
        <Modal.Footer className='container-fluid justify-content-between'>
          <div className='col-lg-5 col-12'>
            <button className="btn btn-danger btn-md rounded-5 col-12" onClick={handleClose}>
              Cancelar
            </button>
          </div>
          <div className='col-lg-5 col-12'>
            <button className="btn btn-primary btn-md rounded-5 col-12" onClick={handleClose}>
              {props.buttonText}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export interface DialogProps {
  text: string,
  buttonText: string
}