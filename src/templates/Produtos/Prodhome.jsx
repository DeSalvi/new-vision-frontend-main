import { Link, useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import '../../components/CSS/Home.css'
import logo from '../../assets/images/home.png'
import { useEffect, useState } from "react"
import UsuarioService from "../../services/UsuarioService"
import Sidebar from "../../components/Menu/Sidebar"

const Prodhome = () => {
    const currentUser = UsuarioService.getCurrentUser();
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        UsuarioService.findAll().then(
            (response) => {
                const usuarios = response.data;
                setUsuarios(usuarios);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);

    const lerUsuario = (id) => {
        navigate(`/mensagemler/` + id)
    }

    document.title = 'New Vision Store';
    
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/home'}
                    title={'Produtos'}
                    logo={logo}
                />
                <section className="d-flex justify-content-around align-items-center m-2 py-5 shadow-lg">
                    {
                        currentUser.nivelAcesso == "OPERADOR" ?
                        <></>
                        : <Link to={'/cadprod'} className="btnnew">
                        Novo
                     </Link>
                    }
                    <Link to={'/prodlista'} className="btnlist">
                        Lista
                    </Link>
                </section>
            </div>
        </div>
    )
}

export default Prodhome