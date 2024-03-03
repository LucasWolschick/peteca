import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

// For the NavigationButton, we use the FontAwesomeIcon together
// The props are simple: we need the icon that you want and a text following the icon
// The Link tag is used for routing the pages
export default function NavigationButton(props: NavigationButtonProps) {
  const route = props.text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
  
  return (
    <>
      <li>
        <Link
          to={"/" + route}
          className="nav-link text-purple gap-3 d-flex align-items-center"
        >
          <FontAwesomeIcon icon={props.icon} size="1x" />
          {props.text}
        </Link>
      </li>
    </>
  );
}

export interface NavigationButtonProps {
  icon: IconProp;
  text: string;
}
