export default function LoginButton(props: LoginButtonProps) {
  return (
    <>
      <button
        className={"btn btn-md rounded-5 w-100 " + props.class}
        type={props.type}
      >
        {props.text}
      </button>
    </>
  );
}

export interface LoginButtonProps {
  text: string;
  class: string;
  type?: "submit" | "reset" | "button";
}
