import Image from "next/image";

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
        <b>SAIR</b>
      </div>
    </div>
  );
}
