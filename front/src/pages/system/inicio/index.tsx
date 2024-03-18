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
import HistoryTable from "@/components/system/HistoryTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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

    }, []);

    return (
        <SystemTemplate>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <h1 className="text-warning">
                            Olá, {loggedUser?.user.nome}!
                        </h1>
                        <div className="d-flex justify-content-between align-items-top  ">
                            <p className="text-warning">{loggedUser?.user.email}</p>
                            {/* <Link href={`/system/usuarios/edit/${loggedUser?.user.id}`} className="text-warning">
                                <FontAwesomeIcon icon={faPen} className="me-4" />
                            </Link> */}
                        </div>
                    </div>

                    <div className="col-lg-8 col-12 mt-3">
                        <h3>Movimentações do estoque</h3>
                        <HistoryTable />
                    </div>
                    <div className="col-lg-4 mt-3">
                        <div className="row">
                            <div className="col-lg-12 col-sm-6">
                                <h3>Calendário</h3>
                                <Calendar calendarType={'gregory'} formatMonth={locale} locale="pt-BR" navigationAriaLive={"polite"} />
                            </div>
                            <div className="col-lg-12 col-sm-6 mt-3 mt-sm-0 mt-lg-3">
                                <h3>Próximos aniversariantes</h3>
                                <label>{moment(today).format("DD/MM/YYYY")} - {moment(todayTwoMonthsAhead).format("DD/MM/YYYY")}</label>
                                {users?.filter(query => new Date(today.getFullYear(), query.data_nascimento.getMonth(), query.data_nascimento.getDate()) >= today
                                    && new Date(today.getFullYear(), query.data_nascimento.getMonth(), query.data_nascimento.getDate()) <= todayTwoMonthsAhead)
                                    .map((user) => {
                                        return (
                                            <dl className="row">
                                                <dt className="col-md-3">
                                                {moment(new Date(user.data_nascimento.getTime() + user.data_nascimento.getTimezoneOffset() * 60000)).format("DD/MM")}
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
            </div>
        </SystemTemplate>
    );
}