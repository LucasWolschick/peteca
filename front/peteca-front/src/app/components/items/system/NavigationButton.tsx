import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// For the NavigationButton, we use the FontAwesomeIcon together
// The props are simple: we need the icon that you want and a text following the icon 
export default function NavigationButton(props: NavigationButtonProps) {
  return (
    <li>
      <a
        href="#"
        className="nav-link text-purple gap-3 d-flex align-items-center"
      >
        <FontAwesomeIcon icon={props.icon} size="1x" />
        {props.text}
      </a>
    </li>
  );
}

export interface NavigationButtonProps {
  icon: IconProp;
  text: string;
}
