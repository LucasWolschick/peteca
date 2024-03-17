export default function Item(props: ItemProps) {
    return (
        <>
            <tr>
                <td>{props.name}</td>
                <td>{props.amount}</td>
                <td>{props.storage}</td>
                <td><input type="checkbox" className="form-input" /></td>
            </tr></>
    );
}

export interface ItemProps {
    name: string,
    amount: number,
    storage: string
}