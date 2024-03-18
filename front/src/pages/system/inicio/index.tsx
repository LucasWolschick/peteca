import SystemTemplate from "../_systemtemplate";
import { AuthContext } from "@/AuthContext";
import { useContext, useEffect, useState } from "react";
import { itemsAPI } from "@/apis/itemsAPI";
import { Log } from "../historico";
import moment, { locale } from "moment";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { format } from "path";
import { User, UsuarioAPI } from "@/apis/usuarioAPI";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// Início screen 
export default function Index() {
    // Today's date
    const today = new Date();
    const actualMonth = today.getMonth();
    const actualYear = today.getFullYear();

    console.log(actualMonth);

    let todayTwoMonthsAhead = new Date(actualYear, actualMonth + 2, today.getDate());
    if (actualMonth >= 10) {
        todayTwoMonthsAhead = new Date(actualYear + 1, actualMonth + 2, today.getDate());
    }


    const [users, setUsers] = useState(undefined as undefined | User[]);
    const [logs, setLogs] = useState<Log[]>([]);
    const loggedUser = useContext(AuthContext).loggedUser;

    // Get the lastest added items in the database to show at a table
    useEffect(() => {
        const fetchLogs = async () => {
            const response = await itemsAPI.getLogs("2023-09-15", moment(today).format("YYYY-MM-DD"));
            console.log(response.data);
            setLogs(response.data);
        };

        UsuarioAPI.getAllUsers()
            .then((response) => {
                setUsers(
                    response.data.map(
                        (user) =>
                        ({
                            id: user.id,
                            nome: user.nome,
                            email: user.email,
                            data_nascimento: user.data_nascimento,
                            imagem: user.imagem,
                        } as User)
                    )
                );
            })
            .catch((error) => {
                console.error(error);
                setUsers([] as User[]);
            });

        fetchLogs();
    }, []);

    return (
        <SystemTemplate>
            <div className="container-fluid">
                <div className="row">
                    <h1 className="text-warning">
                        Olá, {loggedUser?.user.nome}!
                    </h1>
                    <div className="col-lg-8 col-12 mt-3">
                        <h3>Movimentações do estoque</h3>
                        <div className="table-responsive bg-white">
                            <table className="table table-sm table-striped">
                                <thead className="sticky-top">
                                    <tr>
                                        <th>Nome</th>
                                        <th>Data</th>
                                        <th>Tipo de Movimentação</th>
                                        <th>Autor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log) => (
                                        <tr key={log.data + log.item.nome}>
                                            <td>{log.item.nome}</td>
                                            <td>{moment(log.data).format('DD/MM/YYYY hh:mm:ss')}</td>
                                            <td>{log.tipo}</td>
                                            <td>{log.autor.nome}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                    <div className="col-lg-4 mt-3">
                        <h3>Calendário</h3>
                        <Calendar calendarType={'gregory'} formatMonth={locale} locale="pt-BR" navigationAriaLive={"polite"} />

                        <h3 className="mt-3">Próximos aniversariantes</h3>
                        <label>{moment(today).format("DD/MM/YYYY")} - {moment(todayTwoMonthsAhead).format("DD/MM/YYYY")}</label>
                        <div>
                            {users?.filter(query => new Date(today.getFullYear(), query.data_nascimento.getMonth(), query.data_nascimento.getDate()) >= today
                                && new Date(today.getFullYear(), query.data_nascimento.getMonth(), query.data_nascimento.getDate()) <= todayTwoMonthsAhead)
                                .map((user) => {
                                    return (
                                        <dl className="row">
                                            <dt className="col-md-3">
                                                {moment(user.data_nascimento).format("DD/MM")}
                                            </dt>
                                            <dd className="col-md-9">
                                                {user.nome}
                                            </dd>
                                        </dl>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </SystemTemplate>
    );
}