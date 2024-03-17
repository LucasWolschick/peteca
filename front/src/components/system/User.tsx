// The component User shows a photo of the current logged user in the system, with a <a> tag

import Link from "next/link";


// The <a> tag goes to logout
export default function User() {
  return (
    <div className="d-flex flex-row justify-content-between align-items-center text-purple text-decoration-none p-3">
      <img
        src="https://github.com/mdo.png"
        alt=""
        width="40"
        height="40"
        className="rounded-circle me-2"
      />

      <div className="d-flex flex-column">
        <b>Wolschick</b>
        <Link href={"/login"}>SAIR</Link>
      </div>
    </div>
  );
}
