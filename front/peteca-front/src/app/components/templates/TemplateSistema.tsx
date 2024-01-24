import Header from "./Header";
import Sidebar from "./Sidebar";

export default function TemplateSistema() {
  return (
    <>
      <main role="main" className="min-vh-100 overflow-hidden">
        <div id="content" className="open">
          <Header></Header>
          <div className="row">
            <div className="col-3">
              <Sidebar></Sidebar>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
