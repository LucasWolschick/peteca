import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavigationButton(props: NavigationButtonProps)
{
    return (
        <li>
        <a
          href="#"
          className="nav-link text-purple gap-3 d-flex align-items-center"
        >
          <FontAwesomeIcon icon={props.icon} size="1x" />
          {props.transparent ? props.text : ""}
        </a>
      </li>
    );
}

export interface NavigationButtonProps
{
    icon: IconProp
    text: string
    transparent: boolean
}