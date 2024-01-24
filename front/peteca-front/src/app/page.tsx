import "bootstrap/dist/css/bootstrap.min.css";
import TemplateSistema from "./components/templates/TemplateSistema";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function Home() {
  return (
    <>
      <TemplateSistema></TemplateSistema>
    </>
  );
}
