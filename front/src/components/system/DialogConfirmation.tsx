import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function DialogConfirmation(props: DialogConfirmationProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal centered show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false} className='rounded-5'>
                <Modal.Body>Item {props.text} com sucesso</Modal.Body>
                <Modal.Footer className='container-fluid justify-content-center'>
                    <div className='col-lg-5 col-12'>
                        <button className="btn btn-primary btn-md rounded-5 col-12" onClick={handleClose}>
                            Confirmar
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export interface DialogConfirmationProps {
    text: string
} 