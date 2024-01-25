import Image from "next/image";
import Navigation from "./Navigation";
import User from "../items/User";
export default function Header() {
  return (
    <>
      <header>
        <nav className="background-container navbar navbar-expand-lg justify-content-center navbar-toggleable-sm navbar-light bg-light-gray border-bottom box-shadow">
          <Image src={"/logo.png"} alt="Peteca" width={145} height={48} />
          <User />

          <ul className="container-fluid position-relative navbar-nav flex-row justify-content-around">
            <Navigation text={false} />
          </ul>
        </nav>
      </header>
    </>
  );
}
