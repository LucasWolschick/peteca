import "bootstrap/dist/css/bootstrap.min.css";
import SystemTemplate from "./components/templates/system/SystemTemplate";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import LoginTemplate from "./components/templates/login/LoginTemplate";
config.autoAddCss = false;

export default function Home() {
  return (
    <>
      <main role="main" className="min-vh-100 overflow-hidden">
        <div className="min-vw-100">
          {/* <LoginTemplate></LoginTemplate> */}
          <SystemTemplate></SystemTemplate>
        </div>
      </main>
    </>
  );
}
