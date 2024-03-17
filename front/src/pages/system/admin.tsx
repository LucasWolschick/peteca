import Title from "@/components/system/Title";
import SystemTemplate from "./_systemtemplate";

export default function Index() {
    return (
        <SystemTemplate>
            <div className="container-fluid">
                <Title title={"Administração"} />
                <div className="row justify-content-between">
                    <div className="col-lg-4">
                        <div className="row">
                            <button className="btn btn-primary btn-sm rounded-5 mb-3">Fazer backup</button>
                            <button className="btn btn-primary btn-sm rounded-5">Importar backup</button>
                        </div>
                    </div>
                    <div className="col-lg-7 bg-light-violet-blue mt-3 mt-lg-0">
                        <div className="row p-2">
                            <div className="bg-light-gray text-dark">
                                <h5 className="fw-bolder text-center mt-2">27-02-2003 - 07-03-2003</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SystemTemplate>
    );
}