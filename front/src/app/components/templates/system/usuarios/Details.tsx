import Title from "@/app/components/items/system/Title";
import { faCheck, faUserCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// This page gets the informations about one user
// It shows profile picture, name, e-mail, born date and all the permissions the user has
export default function Details() {
    return (
        <>
            <div className="container-fluid">
                <Title title="Usuário" />
            </div>
            <div className="row mt-3 align-items-center">

                <div className="col-md-3">
                    <div className="row justify-content-center justify-content-lg-start">
                        {/* <div className="profile-picture"></div> */}
                        <FontAwesomeIcon icon={faUserCircle} size="10x" />
                    </div>
                </div>
                <div className="col-md-9 mt-3 mt-md-0">
                    <h1 className="fw-bolder">Lucas Wolschick</h1>
                    <p>ra124101@uem.br</p>
                    <p>27/02/2003</p>
                </div>

                <div className="mt-3">
                    <table className="table table-responsive table-sm">
                        <tbody>
                            <tr>
                                <td>Gerir documentos</td>
                                <td><FontAwesomeIcon icon={faCheck} /></td>
                            </tr>
                            <tr>
                                <td>Gerir cadastros</td>
                                <td><FontAwesomeIcon icon={faXmark} /></td>
                            </tr>
                            <tr>
                                <td>Gerir caixinha</td>
                                <td><FontAwesomeIcon icon={faCheck} /></td>
                            </tr>
                            <tr>
                                <td>Gerir estoque</td>
                                <td><FontAwesomeIcon icon={faXmark} /></td>
                            </tr>
                            <tr>
                                <td>Gerir calendário</td>
                                <td><FontAwesomeIcon icon={faCheck} /></td>
                            </tr>
                            <tr>
                                <td>Visualizar caixinha</td>
                                <td><FontAwesomeIcon icon={faXmark} /></td>
                            </tr>
                            <tr>
                                <td>Visualizar documentos</td>
                                <td><FontAwesomeIcon icon={faCheck} /></td>
                            </tr>
                            <tr>
                                <td>Visualizar registros</td>
                                <td><FontAwesomeIcon icon={faXmark} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}