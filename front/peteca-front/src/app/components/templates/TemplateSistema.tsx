import Header from "./Header";
import Sidebar from "./Sidebar";

export default function TemplateSistema() {
  return (
    <>
      <main role="main" className="min-vh-100 overflow-hidden">
        <div id="content" className="open">
          <Header></Header>
          <div className="row bg-purple">
            <Sidebar></Sidebar>
            <div className="col-10  min-vh-100 "></div>
          </div>
        </div>
      </main>
    </>
  );
}
