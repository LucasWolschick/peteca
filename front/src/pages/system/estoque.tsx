
import DialogCreateItem from "@/components/system/DialogCreateItem";
import DialogEditItem from "@/components/system/DialogEditItem";
import Item from "@/components/system/Item";
import Title from "@/components/system/Title";
import { useState } from "react";
import SystemTemplate from "./_systemtemplate";

export default function Index() {

    const [searchTerm, setSearchTerm] = useState('');
    const [filterOption, setFilterOption] = useState('');  

    return (
        <SystemTemplate>
            <div className="container-fluid">
                <Title title="Estoque" />
                <div className="mb-3">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Pesquisar..."
                    />

                    <select
                        value={filterOption}
                        onChange={e => setFilterOption(e.target.value)}
                    >
                        <option value="">Filtrar por...</option>
                        <option value="option1">Data</option>
                        <option value="option2">Quantidade</option>
                        <option value="option3">Local</option>
                        <option value="option4">Nome</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="table-responsive bg-white">
                    <table className="table table-sm table-striped">
                        <thead className="sticky-top">
                            <tr>
                                <th>Item</th>
                                <th>Quantidade</th>
                                <th>Local</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                            <Item name="Sudoku" amount={100} storage="Armário do PET" />
                        </tbody>
                    </table>
                </div>
                <div className="row mt-3 justify-content-around">
                    <DialogCreateItem title={"Adicionar item"} buttonType={"btn-primary"} buttonText={"Adicionar item"} text={"a"} />
                    <DialogEditItem title={"Editar item"} buttonType={"btn-warning"} buttonText={"Editar item"}  />
                </div>
            </div>
        </SystemTemplate>
    );
}