import { Link, useNavigate } from "react-router-dom";
import './Sidebar.css';
import userlogo from '../../assets/images/userlogo.png';
import UsuarioService from "../../services/UsuarioService";

const Sidebar = () => {

    const currentUser = UsuarioService.getCurrentUser();

    const navigate = useNavigate();

    const logout = () => {
        UsuarioService.logout();
        navigate("/");
    }

    const editar = (id) => {
        navigate(`/usuarioperfil/` + id)
    }

    return (
        <>
            {/* currentUser ? */}
                <div className="sidebar">
                    <form onSubmit={logout} className="d-flex flex-column justify-content-around align-items-center m-1 py-2 border-bottom rounded">
                        <img src={userlogo} alt="logo" className="mt-2 w-25" />
                        <div className="my-2">
                            <span className="fw-bold fst-italic">{"Perfil"}</span>
                        </div>
                        <div>
                            <button className="btn btn-sm btn-warning py-1 px-2 mx-1 fw-bold h5 text-danger rounded shadow">
                                <i className="bi bi-box-arrow-left"></i> Sair
                            </button>
                            <button type="button" onClick={() => editar(currentUser.id)}
                                className="btn btn-sm btn-success py-1 px-2 mx-1 fw-bold h5 rounded shadow ">
                                Abrir <i className="bi bi-person-gear"></i>
                            </button>
                        </div>
                    </form>

                    <nav className="nav flex-column">
                        <Link className="nav-link" aria-current="page" to={'/colab'}>Colaboradores</Link>
                        <Link className="nav-link" to={'/mensagemnv'}>Mensagem</Link>
                        <Link className="nav-link" to={'/prodhome'}>Produtos</Link>
                    </nav>
                </div> {/* :
                <></>
            } */}
        </>
    )
}

export default Sidebar