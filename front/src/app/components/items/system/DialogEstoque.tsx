import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function DialogEstoque(props: DialogEstoqueProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <button className={`btn ${props.buttonType} btn-sm rounded-5 col-lg-4 col-md-5 col-10 mt-2 mt-md-0`} onClick={handleShow}>
                {props.buttonText}
            </button>

            <Modal centered show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false} className='rounded-5'>
                <Modal.Title className="text-center">{props.title}</Modal.Title>
                <Modal.Body>
                    <div className="row">
                        <div className="mb-3 col-lg-6">
                            <label className="form-label">Nome:</label>
                            <input type="text" className="form-control"></input>
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label className="form-label">Local:</label>
                            <input type="text" className="form-control"></input>
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label className="form-label">Quantidade:</label>
                            <input type="number" className="form-control"></input>
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label className="form-label">Unidade de medida:</label>
                            <input type="text" className="form-control"></input>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='container-fluid justify-content-between'>
                    <div className='col-lg-5 col-12'>
                        <button className="btn btn-danger btn-md rounded-5 col-12" onClick={handleClose}>
                            Cancelar
                        </button>
                    </div>
                    <div className='col-lg-5 col-12 '>
                        <button className="btn btn-primary btn-md rounded-5 col-12" onClick={handleClose}>
                            {props.buttonText}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export interface DialogEstoqueProps {
    title: string,
    buttonType: string,
    buttonText: string,
    text: string
}