import Image from "next/image";
import Navigation from "./Navigation";
import User from "../items/User";
export default function Header() {
  return (
    <>
      <header>
        <nav className="background-container navbar justify-content-center navbar-light bg-light-gray ">
          <div className="container-fluid align-items-center justify-content-between mx-3">
            <Image src={"/logo.png"} alt="Peteca" width={145} height={48} />
            <User />
          </div>
          <ul className="container-fluid navbar-nav flex-row justify-content-around">
            <Navigation text={false} />
          </ul>
        </nav>
      </header>
    </>
  );
}
