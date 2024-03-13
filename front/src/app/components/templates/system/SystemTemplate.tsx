import Header from "./Header";
import Sidebar from "./Sidebar";
import SystemRoutes from "./SystemRoutes";
import Index from "./estoque/Index";
import Create from "./usuarios/Create";
import Details from "./usuarios/Details";
import List from "./usuarios/List";

// The SystemTemplate will be used mostly, since it will be in almost all the screens
// It is the logged part of the system
export default function SystemTemplate() {
  return (
    <>
      <div className="row bg-purple g-0">
        <div className="col-md-3 d-none d-md-block">
          <Sidebar></Sidebar>
        </div>
        <div className="d-md-none">
          <Header />
        </div>
        <div className="col-md-9 col-12 min-vh-100 text-white p-5">
          {/* <SystemRoutes /> */}
          {/* <Create /> */}
          {/* <List /> */}
          {/* <Details /> */}
          <Index />
        </div>
      </div>
    </>
  );
}