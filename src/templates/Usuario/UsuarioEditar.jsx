import { Link, useParams } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useRef, useState } from "react"
import UsuarioService from "../../services/UsuarioService"

const UsuarioEditar = () => {

    const objectValues = {
        id: null,
        nome: "",
        re: "",
        nivelAcesso: "",
        statusUsuario: ""
    };

    const [usuario, setUsuario] = useState(objectValues);

    const { id } = useParams();
    const _dbRecords = useRef(true);
    const [formData, setFormData] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState();


    useEffect(() => {
        UsuarioService.findById(id).then(
            (response) => {
                const usuario = response.data;
                setUsuario(usuario);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUsuario(usuario => ({ ...usuario, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);

        UsuarioService.alterar(id, usuario).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        )
    }


    const inativar = (e) => {
        e.preventDefault();

        UsuarioService.inativar(id).then(
            (response) => {
                setMessage(response.data.message);
                window.location.reload();
            }, (error) => {
                const message = error.response.data.message;
                setMessage(message);
            }
        )
    }

    const reativar = (e) => {
        e.preventDefault();

        UsuarioService.reativar(id).then(
            (response) => {
                setMessage(response.data.message);
                window.location.reload();
            }, (error) => {
                const message = error.response.data.message;
                setMessage(message);
            }
        )
    }

    document.title = 'New Vision Store';
    
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/colabnv'}
                    title={'Editar Usuário'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <form className="row g-2 m-5 p-2 rounded-2 shadow" onSubmit={handleSubmit} >
                        {!successful && (
                            <>
                                <div className="col-md-2">
                                    <label htmlFor="inputID" className="form-label mb-1 fw-bold">ID:</label>
                                    <input type="text" className="form-control" id="inputID" readOnly
                                        defaultValue={usuario.id} />
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="inputNome" className="form-label mb-1 fw-bold">Nome:</label>
                                    <input type="text" className="form-control" id="inputNome"
                                        value={usuario.nome}
                                        name="nome"
                                        onChange={handleChange} />
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="inputRe" className="form-label mb-1 fw-bold">RE:</label>
                                    <input type="text" className="form-control" id="inputRe" readOnly
                                        defaultValue={usuario.re}
                                    />
                                </div>

                                <div className="col-md-4 my-3">
                                    <label htmlFor="inputData" className="form-label mb-1 fw-bold">Data de Cadastro:</label>
                                    <input type="text" className="form-control" id="inputData" readOnly
                                        defaultValue={usuario.dataCadastro} />
                                </div>
                                <div className="col-md-4 my-3">
                                    <label htmlFor="inputStatus" className="form-label mb-1 fw-bold">Status:</label>
                                    <input type="text" className="form-control" id="inputStatus" readOnly
                                        defaultValue={usuario.statusUsuario} />
                                </div>
                                <div className="col-md-4 my-3">
                                    <label htmlFor="inputAcesso" className="form-label mb-1 fw-bold">Acesso:</label>
                                    <select id="inputAcesso" className="form-select"
                                        name="nivelAcesso"
                                        onChange={(e) => handleChange(e)}
                                        value={usuario.nivelAcesso} >
                                        <option value={usuario.nivelAcesso} disabled>
                                            {usuario.nivelAcesso}
                                        </option>
                                        <option value={"OPERADOR"}>OPERADOR</option>
                                        <option value={"GERENTE"}>GERENTE</option>
                                        <option value={"ADMIN"}>ADMIN</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-2 d-flex justify-content-between">
                                    <button className="btn btn-success" >
                                        Gravar Alterações
                                    </button>
                                    <button type="button" className="btn btn-warning" onClick={reativar}>
                                        Reativar /  Resetar a Senha
                                    </button>
                                   
                                    <button type="button" className="btn btn-danger" onClick={inativar}>
                                        Inativar Conta
                                    </button>
                                </div>
                            </>
                        )}
                        {message && (
                            <div className="m-1">
                                <div className={
                                    "text-center h4 fst-italic py-4 rounded-2 " + (successful ? "bg-success" : "bg-danger")
                                }>
                                    {message}
                                </div>
                            </div>
                        )}
                    </form>
                </section>
            </div>
        </div>
    )
}

export default UsuarioEditar