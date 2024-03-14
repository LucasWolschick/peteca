import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function DialogDeleteItemConfirmation() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className={`btn btn-danger btn-md rounded-5 col-12`} onClick={handleShow}>
                Remover item
            </button>


            <Modal centered show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false} className='rounded-5'>
                <Modal.Body>Deseja remover esse item?</Modal.Body>
                <Modal.Footer className='container-fluid justify-content-between'>
                    <div className='col-lg-5 col-12'>
                        <button className="btn btn-danger btn-md rounded-5 col-12" onClick={handleClose}>
                            Cancelar
                        </button>
                    </div>
                    <div className='col-lg-5 col-12'>
                        <button className="btn btn-primary btn-md rounded-5 col-12" onClick={handleClose}>
                            Remover
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}