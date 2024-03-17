export default function LoginTitle(props: LoginTitleProps) {
    return (
        <>
            <h3 className="text-warning text-center fw-bolder">
                {props.title}
            </h3>
        </>
    );
}

export interface LoginTitleProps {
    title: string
}