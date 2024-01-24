import Header from "./Header";
import Sidebar from "./Sidebar";

export default function TemplateSistema() {
  return (
    <>
      <div className="col-12 ">
        <div className="col-3">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
