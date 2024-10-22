import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoNv from "../../assets/images/LogoNv.png";
import UsuarioService from "../../services/UsuarioService";
import './Login.css';

const Login = () => {

    const navigate = useNavigate();

    const goto = () => {
        navigate("/mainadm");
    }

    const backto = () => {
        navigate("/");
    }

    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(formData => ({ ...formData, [name]: value }))
    }

    const editar = (id) => {
        navigate(`/usuarioeditar/` + id)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        UsuarioService.signin(formData.re, formData.password).then(
            () => {
                const userJson = localStorage.getItem("user");
                const user = JSON.parse(userJson || '{}');
                if (user.statusUsuario == 'ATIVO') {
                    navigate("/home");
                } else if (user.statusUsuario == 'TROCAR_SENHA') {
                    navigate(`/newpass/` + user.id);
                    //window.location.reload(); ordnael@email.com.br
                }

            },
            (error) => {
                const respMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(respMessage);
            }

        );
    };

    document.title = 'New Vision Store';

    return (
        <div className="container">
            <div className="logo_header">
                <Link to={"/main"}><img src={LogoNv} className="logo_header" /></Link>
            </div>
            <form action="" className="login-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="re" className="form-label mb-0 fw-bold">Re:</label>
                    <input type="text" id="re" className="form-control text-center fw-medium shadow"
                        name="re"
                        value={formData.re || ""}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password" className="form-label mb-0 fw-bold">Senha:</label>
                    <input type="password" id="password" className="form-control text-center fw-medium shadow"
                        name="password"
                        value={formData.password || ""}
                        onChange={handleChange} />
                </div>
                <div className="text-center p-2 rounded-2">
                    {message && (
                        <div className="fw-bold fs-5 text-danger">
                            <span>{message}</span>
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-around mb-3 mt-2">
                    <button className="backbtn" type="button"
                        onClick={backto}>Cancelar</button>
                    <button className="logbtn" type="submit">
                        Entrar</button>
                </div>
            </form>
        </div>
    )
}

export default Login