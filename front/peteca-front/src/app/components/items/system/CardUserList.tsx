import { faUserCircle, faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// This component is for the List page, for the users
// Has some props linked to the user informations
export default function CardUserList(props: CardUserListProps) {
    return (
        <>
            <div className="bg-light-gray border-0 rounded-0 row align-items-center justify-content-between m-3 text-dark">
                <div className="d-flex col-12 col-lg-6 align-items-center justify-content-start ">
                    <FontAwesomeIcon icon={faUserCircle} size="3x" />
                    <label className="ms-3">{props.name}</label>
                </div>
                <div className="d-flex col-12 col-lg-6 align-items-center justify-content-md-end justify-content-center mt-2 mt-md-0">
                    <label className="me-3">{props.email}</label>
                    <a href="#" className="text-dark">
                        <FontAwesomeIcon icon={faPen} size="1x" />
                    </a>
                    <a href="#" className="text-dark ms-3">
                        <FontAwesomeIcon icon={faEye} size="1x" />
                    </a>
                </div>
            </div>
        </>
    );
}

export interface CardUserListProps {
    name: string,
    email: string
}