import Header from "./Header";
import Sidebar from "./Sidebar";

export default function SystemTemplate() {
  return (
    <>
      <main role="main" className="min-vh-100 overflow-hidden">
        <div id="content" className="open">
          <div className="row bg-purple g-0">
            <div className="col-md-3 d-none d-md-block">
              <Sidebar></Sidebar>
            </div>
            <div className="d-md-none">
              <Header />
            </div>
            <div className="col-lg-9 col-md-8 col-12 min-vh-100 text-white">
              
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
