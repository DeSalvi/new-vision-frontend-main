import { Link, useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useState } from "react"
import ProdutoService from "../../services/ProdutoService"
import UsuarioService from "../../services/UsuarioService"

const Prod_nv = () => {

    const currentUser = UsuarioService.getCurrentUser();
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [habilitar, setHabilitar] = useState(false);

    useEffect(() => {
        ProdutoService.findAll().then(
            (response) => {
                const produtos = response.data;
                setProdutos(produtos);
                console.log(produtos);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        if(currentUser.nivelAcesso == "OPERADOR"){
            setHabilitar(true)
        }
    }, []);
    

    const lerProduto = (id) => {
        navigate(`/produtoeditar/` + id)
    }

    document.title = 'New Vision Store';
    
    return (
        <div className="d-flex">
        <Sidebar />
        <div className="p-3 w-100">
            <Header
                goto={'/prodhome'}
                title={'Produtos'}
                logo={logo}
            />
                <section className="p-2 m-2 shadow-lg">
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID:</th>
                                    <th scope="col">Nome:</th>
                                    <th scope="col">Descrição:</th>
                                    <th scope="col">Codigo de Barras:</th>
                                    <th scope="col">Preço:</th>
                                    <th scope="col">Categoria:</th>
                                    <th scope="col">Satus:</th>
                                    <th scope="col">Editar:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos?.map((produto) => (
                                    <tr key={produto.id}>
                                        <td>{produto.id}</td>
                                        <td scope="row">{produto.nome}</td>
                                        <td>{produto.descricao}</td>
                                        <td>{produto.codigoBarras}</td>
                                        <td>{produto.preco}</td>
                                        <td>{produto.categoria.nomeCat}</td>
                                        <td>{produto.statusProd}</td>
                                        <td>
                                            <button type="button" onClick={() => lerProduto(produto.id)}
                                                className="btn btn-sm btn-warning" disabled={habilitar}>
                                                <i></i>Abrir
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Prod_nv
