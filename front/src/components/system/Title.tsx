import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

// Component used for the title of the page, since all the pages has the same type style of title
// So we have the props that contains the title that you want
export default function Title(props: TitleProps) {
  const router = useRouter();

  return (
    <>
      <Link
        className="text-warning text-decoration-none d-flex align-items-center"
        href="/system/inicio"
      >
        <FontAwesomeIcon icon={faChevronLeft} size="2x" /> Voltar
      </Link>
      <h1 className="text-warning">{props.title}</h1>
    </>
  );
}

export interface TitleProps {
  title: string;
}
