import Image from "next/image";
import Navigation from "./Navigation";
import User from "../../items/system/User";

// The sidebar appears when it is a bigger device, if it is mobile shows the header
export default function Sidebar() {
  return (
    <>
      <nav className="d-flex flex-column min-vh-100 bg-light-gray col-12 p-3">
        <div className="d-flex justify-content-center align-self-center p-3">
          <Image src={"/logo.svg"} alt="Peteca" width={145} height={48} />
        </div>

        <hr className="text-purple"></hr>
        <ul className="nav nav-pills nav-flush flex-column mb-auto">
          <Navigation></Navigation>
        </ul>

        <hr className="text-purple"></hr>
        <div className="d-flex justify-content-start">
          <User />
        </div>
      </nav>
    </>
  );
}
