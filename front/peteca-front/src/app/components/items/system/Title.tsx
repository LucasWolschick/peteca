import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Title(props: TitleProps) {
    return (
        <>
            <a
                className="text-warning text-decoration-none d-flex align-items-center"
                href="/"
            >
                <FontAwesomeIcon icon={faChevronLeft} size="2x" /> Voltar
            </a>
            <h1 className="text-warning">{props.title}</h1>
        </>
    );
}

export interface TitleProps {
    title: string
} 