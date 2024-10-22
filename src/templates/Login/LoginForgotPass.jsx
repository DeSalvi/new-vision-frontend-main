import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/LogoNv.png"
import './Login.css';

const LoginForgotPass = () => {

    const navigate = useNavigate();

    const goto = () => {
        navigate("/");
    }

    const backto = () => {
        navigate("/login");
    }


    return (
        <div className="container">
            <div className="logo_header">
                <Link to={"/main"}><img src={logo} className="logo_header" /></Link>
            </div>
            <form action="" className="forgotpass-form">
                <h5 className="text-center">Recuperação de Senha</h5>
                <div className="my-3">
                    <label htmlFor="email" className="form-label mb-0 fw-bold">RE:</label>
                    <input type="text" id="re" className="form-control text-center fw-medium shadow" minLength={6} maxLength={6} />
                </div>
                <div className="d-flex flex-row-reverse mt-1">
                    <p className="linksyst">Acessar o sistema:
                        <Link to={'/login'}> Clique aqui.</Link>
                    </p>
                </div>
                <div className="d-flex justify-content-center my-1 d-none" id="infos">
                    <p className="fw-bold fst-italic text-danger">
                        Dados Incorretos!!!
                    </p>
                </div>
                <div className="d-flex justify-content-around mb-3 mt-2">
                    <button className="fgtcancel" type="button"
                        onClick={backto}>Cancelar</button>
                    <button className="fgtconfirm" type="submit"
                        onClick={goto} >Solicitar Nova Senha</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForgotPass