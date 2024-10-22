import { Link, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import ProdutoService from "../../services/ProdutoService"
import logo from '../../assets/images/home.png'
import './PagProduto.css'

const PagProduto = () => {

    const { id } = useParams();
    const _dbRecords = useRef(true);

    const initialObjectState = {
        id: null,
        nome: "",
        descricao: "",
        codigoBarras: "",
        preco: 0,
        categoria: {
            id: null
        },
        statusProduto: ""
    };

    const [produto, setProduto] = useState(initialObjectState);
    const [categorias, setCategorias] = useState([]);
    const [file, setFile] = useState("");
    const [chosenImage, setChosenImage] = useState();

    useEffect(() => {
        if (_dbRecords.current) {
            ProdutoService.findById(id)
                .then(response => {
                    const produto = response.data;
                    setProduto(produto);
                    console.log(produto);
                })
                .catch(e => {
                    console.log(e);
                });
        } return () => {
            _dbRecords.current = false;
        }
    }, [id]);

    const setChosenFile = (dataFile) => {
        setFile(dataFile);
    }

    const setImage = (dataImage) => {
        setChosenImage(dataImage);
    }

    document.title = 'New Vision Store';

    return (
        <div className="container">
            <div className="product">
                <div className="col-lg-12 text-center my-3">
                    <img className="shadow-lg" src={produto.foto ? 'data:image/jpeg;base64,' + produto.foto : logo} alt="..." />
                </div>
                <h2>{produto.nome}</h2>
                <p>{produto.descricao}</p>
                <p className="price">R${produto.preco}</p>
                <Link className='btn btn-danger' to={'/'}>VOLTAR</Link>
            </div>
        </div>
    )
}
export default PagProduto