import { Routes, Route} from "react-router-dom"
import App from "../templates/App/App"
import Home from "../templates/Home/Home"
import LoginForgotPass from "../templates/Login/LoginForgotPass"
import Login from "../templates/Login/Login"
import MensagemLer from "../templates/Mensagem/MensagemLer"
import UsuarioEditar from "../templates/Usuario/UsuarioEditar"
import LoginNewPass from "../templates/Login/LoginNewPass"
import UsuarioPerfil from "../templates/Usuario/UsuarioPerfil"
import UsuarioAlterarSenha from "../templates/Usuario/UsuarioAlterarSenha"
import Main from "../templates/Main/Main"
import Cad_prod from "../templates/Produtos/Cad_prod"
import ColabLista from "../templates/Usuario/UsuarioLista"
import Colabhome from "../templates/Usuario/UsuarioHome"
import Msghome from "../templates/Mensagem/Msghome"
import Prodhome from "../templates/Produtos/Prodhome"
import ProdLista from "../templates/Produtos/ProdLista"
import ProdutoEditar from "../templates/Produtos/ProdutoEditar"
import MensagemLista from "../templates/Mensagem/MensagemLista"
import PagProduto from "../templates/Produtos/PagProduto"
import CadUsuario from "../templates/Usuario/CadUsuario.jsx"

 

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/main" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpass" element={<LoginForgotPass />} />
        <Route path="/newpass/:id" element={<LoginNewPass/>} />
        <Route path="/mensagemler/:id" element={<MensagemLer />} />
        <Route path="/usuarioeditar/:id" element={<UsuarioEditar />} />
        <Route path="/usuarioperfil/:id" element={<UsuarioPerfil />} />
        <Route path="/usuarioalterarsenha/:id" element={<UsuarioAlterarSenha />} />
        <Route path="/" element={<Main />} />
        <Route path="/cadprod" element={<Cad_prod />} />
        <Route path="/colabnv" element={<ColabLista />} />
        <Route path="/colab" element={<Colabhome />} />
        <Route path="/mensagemnv" element={<Msghome />} />
        <Route path="/prodhome" element={<Prodhome />} />
        <Route path="/prodlista" element={<ProdLista />} />
        <Route path="/produtoeditar/:id" element={<ProdutoEditar />} />
        <Route path="/mensagemlista" element={<MensagemLista />} />
        <Route path="/pagproduto/:id" element={<PagProduto />} />
        <Route path="/cadusuario" element={<CadUsuario />} />

      </Routes>
    </div>
  )
}
export default AppRoutes