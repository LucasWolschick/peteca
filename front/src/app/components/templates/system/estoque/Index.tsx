import DialogCreateItem from "@/app/components/items/system/DialogCreateItem";
import DialogEditItem from "@/app/components/items/system/DialogEditItem";
import Item from "@/app/components/items/system/Item";
import Title from "@/app/components/items/system/Title";

export default function Index() {
    return (
        <>
            <div className="container-fluid">
                <Title title="Estoque" />

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
        </>
    );
}