import './Header.css'
import { Link } from "react-router-dom";
import LogoNv from '../../assets/images/LogoNv.png'

const Header = ({ goto, title, logo }) => {

    return (
        <div className="
            d-flex justify-content-between align-content-center 
            p-3 border-bottom shadow rounded">
            <Link to={goto} className="btn btn-info shadow">Voltar</Link>
            <div className='TituloHeader'>
                <span className="fw-bold h2">{title}</span>
            </div>
            <div>
                <img src={LogoNv} className="logo_header_read" />
            </div>
        </div>
    )
}

export default Header