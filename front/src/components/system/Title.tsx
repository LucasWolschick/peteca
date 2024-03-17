import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

// Component used for the title of the page, since all the pages has the same type style of title
// So we have the props that contains the title that you want
export default function Title(props: TitleProps) {
    return (
        <>
            <Link
                className="text-warning text-decoration-none d-flex align-items-center"
                href="/system"
            >
                <FontAwesomeIcon icon={faChevronLeft} size="2x" /> Voltar
            </Link>
            <h1 className="text-warning">{props.title}</h1>
        </>
    );
}

export interface TitleProps {
    title: string
} 