import { faUserCircle, faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// This component is for the List page, for the users
// Has some props linked to the user informations
export default function CardUserList(props: CardUserListProps) {
  return (
    <>
      <div className="bg-light-gray border-0 rounded-0 row align-items-center justify-content-between m-3 text-dark">
        <div className="d-flex col-12 col-lg-5 col-sm-6 align-items-center justify-content-sm-start justify-content-center">
          <FontAwesomeIcon icon={faUserCircle} size="3x" />
          <label className="ms-3">{props.name}</label>
        </div>
        <div className="d-flex col-12 col-lg-5 col-sm-8 align-items-center justify-content-lg-start  justify-content-sm-start justify-content-center my-2 my-md-0">
          <label>{props.email}</label>
        </div>
        <div className="d-flex col-12 col-lg-2 col-sm-4 align-items-center justify-content-sm-end justify-content-center">
          {props.editUser !== undefined && (
            <button
              className="text-dark"
              onClick={() => (props.editUser as any)()}
            >
              <FontAwesomeIcon icon={faPen} size="1x" />
            </button>
          )}
          <button className="text-dark ms-3" onClick={() => props.viewUser()}>
            <FontAwesomeIcon icon={faEye} size="1x" />
          </button>
        </div>
      </div>
    </>
  );
}

export interface CardUserListProps {
  name: string;
  email: string;
  editUser?: () => void;
  viewUser: () => void;
}
