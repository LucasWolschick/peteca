import Image from "next/image";

export default function LoginTemplate() {
  return (
    <>
      <div className="row bg-purple min-vh-100">
        <div className="d-flex justify-content-center align-self-center">
          <Image src={"/logo.svg"} alt="Peteca" width={362} height={120} />
        </div>
        <div></div>
      </div>
    </>
  );
}
