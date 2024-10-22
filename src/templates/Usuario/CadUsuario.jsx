import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useState } from "react"
import UsuarioService from "../../services/UsuarioService"

const UsuarioNovo = () => {

    const [formData, setFormData] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(formData => ({ ...formData, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);

        UsuarioService.create(formData).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
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
                    goto={'/colab'}
                    title={'Novo Colaborador'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <form className="row g-2 m-5 p-2 rounded-2 shadow" onSubmit={handleSubmit}>
                        {!successful && (
                            <>
                                <div className="col-md-5">
                                    <label htmlFor="inputNome" className="form-label mb-1 fw-bold">Nome:</label>
                                    <input  type="text" className="form-control" id="inputNome" 
                                            name="nome"
                                            value={formData.nome || ""}
                                            onChange={handleChange} />
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="inputEmail" className="form-label mb-1 fw-bold">RE:</label>
                                    <input  type="text" className="form-control" id="inputRe" minLength={6} maxLength={6}
                                            name="re"
                                            value={formData.re || ""}
                                            onChange={handleChange}/>
                                </div>

                                <div className="col-md-2">
                                    <label htmlFor="inputAcesso" className="form-label mb-1 fw-bold">Acesso:</label>
                                    <select id="inputAcesso" className="form-select" name="nivelAcesso"
                                        defaultValue={''} onChange={(e) => handleChange(e)}>

                                        <option value={''} disabled>
                                            Nível de Acesso...
                                        </option>
                                        <option value={"OPERADOR"}>OPERADOR</option>
                                        <option value={"GERENTE"}>GERENTE</option>
                                        <option value={"ADMIN"}>ADMIN</option>
                                    </select>
                                </div>

                                <div className="col-12 my-2">
                                    <button type="submit" className="btn btn-primary">
                                        Gravar
                                    </button>
                                </div>
                            </>
                        )}
                        {message && (
                            <div className="m-1">
                                <div className={
                                    "text-center h4 fst-italic py-4 rounded-2 border border-5 " + (successful ? "border-success" : "border-danger")
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

export default UsuarioNovo