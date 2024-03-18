import DialogCreateItem from "@/components/system/DialogCreateItem";
import DialogEditItem from "@/components/system/DialogEditItem";
import ItemEntry from "@/components/system/ItemEntry";
import Title from "@/components/system/Title";
import { useEffect, useState } from "react";
import SystemTemplate from "./_systemtemplate";
import { Item, itemsAPI } from "@/apis/itemsAPI";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Index() {
  const [selectedItems, setSelectItems] = useState(new Set<Item>());

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const [listaitems, setListaItems] = useState<Item[]>([]);

  const filteredItems = listaitems.filter((item) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    setSelectItems(new Set<Item>());
    setRefresh((s) => s + 1);
  };

  useEffect(() => {
    const fetchItems = async () => {
      const response = await itemsAPI.getitems();
      setListaItems(response.data);
    };

    fetchItems();
  }, [refresh]);

  const sortItems = (option: string, items: Item[]) => {
    let sortedItems = [...items];
    switch (option) {
      case "Quantidade":
        sortedItems.sort((a, b) => b.quantidade - a.quantidade);
        break;
      case "Local":
        sortedItems.sort((a, b) => a.local.localeCompare(b.local));
        break;
      case "Nome":
        sortedItems.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      default:
        break;
    }

    return sortedItems;
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setFilterOption(option);
    setListaItems(sortItems(option, listaitems));
  };

  return (
    <SystemTemplate>
      <div className="container-fluid">
        <Title title="Estoque" />
        <div className="mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectItems(new Set<Item>());
            }}
            placeholder="Pesquisar..."
          />

          <select value={filterOption} onChange={handleFilterChange}>
            <option value="">Filtrar por...</option>
            <option value="Quantidade">Quantidade</option>
            <option value="Local">Local</option>
            <option value="Nome">Nome</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="table-responsive bg-white">
          <table className="table table-striped">
            <thead className="sticky-top">
              <tr>
                <th>Item</th>
                <th>Quantidade</th>
                <th>Local</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item: Item) => (
                <ItemEntry
                  key={refresh + "" + item.id}
                  name={item.nome}
                  amount={item.quantidade}
                  storage={item.local}
                  selecionado={selectedItems.has(item)}
                  setSelecionado={(selecionado: boolean) => {
                    if (selecionado) {
                      selectedItems.add(item);
                    } else {
                      selectedItems.delete(item);
                    }
                    setSelectItems(new Set(selectedItems));
                  }}
                  unit={item.unidadeMedida}
                />
              ))}
            </tbody>
          </table>
          \
        </div>
        <div className="row mt-3 justify-content-around">
          <DialogCreateItem
            title={"Adicionar item"}
            buttonType={"btn-primary"}
            buttonText={"Adicionar item"}
            text={"a"}
            onCreate={(item) =>
              itemsAPI
                .criar(
                  item.nome,
                  item.quantidade,
                  item.unidadeMedida,
                  item.local
                )
                .then((_) => handleRefresh())
            }
            refresh={handleRefresh}
          />

          <DialogEditItem
            title={"Editar item"}
            buttonType={"btn-warning"}
            buttonText={"Editar item"}
            itens={selectedItems}
            refresh={handleRefresh}
          />

          {/* <Link href="/system/historico"> */}
          <button className="btn btn-info btn-sm rounded-5 col-lg-4 col-md-5 col-10 mt-2 mt-md-0">
            <Link
              href="/system/historico"
              className="text-decoration-none text-black"
            >
              Ver Histórico
            </Link>
          </button>
          {/* </Link> */}
        </div>
      </div>
    </SystemTemplate>
  );
}
