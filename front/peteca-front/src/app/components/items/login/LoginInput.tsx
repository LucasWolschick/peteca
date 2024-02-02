import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoginInput(props: LoginInputProps) {
    return (
        <>
            <label className="text-light text-left">{props.text}</label>
            <div className="input-group mb-3">
                <span className="input-group-text"><FontAwesomeIcon icon={props.icon} /></span>
                <input type={props.type} className="form-control" placeholder={props.placeholder} />
            </div>
        </>
    );
}

export interface LoginInputProps {
    text: string,
    placeholder: string,
    icon: IconProp,
    type: string 
}