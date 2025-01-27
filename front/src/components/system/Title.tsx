import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

export default function Title(props: TitleProps) {
  const router = useRouter();

  const handleBack = () => {
    if (props.backRoute) {
      router.push(props.backRoute);
    } else {
      const pathSegments = router.asPath.split("/").filter(Boolean);
      pathSegments.pop();
      const newPath = "/" + pathSegments.join("/");
      router.push(newPath || "/");
    }
  };

  return (
    <>
      <a
        className="text-warning text-decoration-none d-flex align-items-center"
        onClick={handleBack}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="2x" /> Voltar
      </a>
      <h1 className="text-warning">{props.title}</h1>
    </>
  );
}

export interface TitleProps {
  title: string;
  backRoute?: string;
}
