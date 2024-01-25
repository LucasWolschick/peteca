import "bootstrap/dist/css/bootstrap.min.css";
import SystemTemplate from "./components/templates/SystemTemplate";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function Home() {
  return (
    <>
      <SystemTemplate></SystemTemplate>
    </>
  );
}
