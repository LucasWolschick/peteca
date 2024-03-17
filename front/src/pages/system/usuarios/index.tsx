
import CardUserList from "@/components/system/CardUserList";
import Title from "@/components/system/Title";
import SystemTemplate from "../_systemtemplate";

// This page list the users of the system
// In this page, you can be redirected to the Create page, creating or editing a user
export default function List() {
    return (
        <SystemTemplate>
            <div className="container-fluid">
                <Title title="Usuários" />
                <div className="row mt-3 align-items-center justify-content-center overflow-auto ">
                    <div className="col-md-8 col-12 overflow-auto">
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example bg-light-gray border-0 rounded-0 gap-3">
                            <CardUserList name="Caio Vieira Arasaki" email="Não sei"/>
                            <CardUserList name="Guilherme Frare Clemente" email="Não sei"/>
                            <CardUserList name="Lucas Wolschick" email="Não sei"/>
                            <CardUserList name="Marcos Vinicius de Oliveira" email="Não sei"/>
                            <CardUserList name="Matheus Hamada" email="ra124101@uem.br"/>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <div className="col-md-8 col-12">
                        <button className="btn btn-primary btn-sm rounded-5">Cadastrar usuário</button>
                    </div>
                </div>
            </div>
        </SystemTemplate>
    );
}