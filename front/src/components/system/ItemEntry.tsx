import { useState } from "react";

export default function ItemEntry(props: ItemEntryProps) {
  const [selecionado, setSelecionado] = [
    props.selecionado,
    props.setSelecionado,
  ];
  // Tirar os items da lista quando eles sairem da lista

  return (
    <>
      <tr>
        <td>{props.name}</td>
        <td>{props.amount + " " + props.unit}</td>
        <td>{props.storage}</td>
        <td>
          <input
            type="checkbox"
            className="form-input"
            checked={selecionado}
            onChange={(e) => {
              setSelecionado(e.target.checked);
            }}
          />
        </td>
      </tr>
    </>
  );
}

export interface ItemEntryProps {
  name: string;
  amount: number;
  storage: string;
  selecionado: boolean;
  setSelecionado: (selecionado: boolean) => void;
  unit: string;
}
