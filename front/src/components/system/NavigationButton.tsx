import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

// For the NavigationButton, we use the FontAwesomeIcon together
// The props are simple: we need the icon that you want and a text following the icon
// The Link tag is used for routing the pages
export default function NavigationButton({ icon, text, route }: NavigationButtonProps) {  
  return (
    <>
      <li>
        <Link
          href={route}
          className="nav-link text-purple gap-3 d-flex align-items-center"
        >
          <FontAwesomeIcon icon={icon} size="1x" />
          {text}
        </Link>
      </li>
    </>
  );
}

export interface NavigationButtonProps {
  icon: IconProp;
  text: string;
  route: string;
}
