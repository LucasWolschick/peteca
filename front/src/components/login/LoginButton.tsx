export default function LoginButton(props: LoginButtonProps) {
    return (
        <>
            <button className={"btn btn-md rounded-5 w-100 " + props.class} onClick={props.onClick}>
                {props.text}
            </button>
        </>
    );
}

export interface LoginButtonProps {
    text: string,
    class: string,
   onClick?: () => void
    
}