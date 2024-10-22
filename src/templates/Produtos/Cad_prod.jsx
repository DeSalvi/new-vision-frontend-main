import { Link, Navigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useRef, useState } from "react"
import ProdutoService from "../../services/ProdutoService"
import CategoriaService from "../../services/CategoriaService"
import ImageUploaderModal from "../../components/ImageUploader/ImageUploaderModal"

const Cad_prod = () => {

    const _dbRecords = useRef(true);
    const [categorias, setCategorias] = useState([]);
    const [file, setFile] = useState("");
    const [formData, setFormData] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState();

    const [chosenImage, setChosenImage] = useState();

    const setChosenFile = (dataFile) => {
        setFile(dataFile);
    }

    const setImage = (dataImage) => {
        setChosenImage(dataImage);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(formData => ({ ...formData, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);

        ProdutoService.createComFoto(file, formData).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            }, (error) => {
                const message = error.response.data.message;
                setMessage(message);
            }
        )
    }

    useEffect(() => {
        if (_dbRecords.current) {
            CategoriaService.findAll().then(
                (response) => {
                    const categorias = response.data;
                    setCategorias(categorias);
                }
            ).catch((error) => {
                console.log(error);
            })
        }
        return () => {
            _dbRecords.current = false;
        }
    }, []);

    document.title = 'New Vision Store';

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/prodhome'}
                    title={'Novo Produto'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <form className="row g-2 m-5 p-2 rounded-2 shadow" onSubmit={handleSubmit}>
                        {!successful && (
                            <>
                                <div className="col-md-5">
                                    <label htmlFor="inputNome" className="form-label mb-1 fw-bold">Nome:</label>
                                    <input type="text" className="form-control" id="inputNome"
                                        name="nome"
                                        value={formData.nome || ""}
                                        onChange={handleChange} />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="inputCodigo" className="form-label mb-1 fw-bold">Código:</label>
                                    <input type="text" className="form-control" id="inputCodigo" maxLength={12} minLength={12}
                                        name="codigoBarras"
                                        value={formData.codigoBarras || ""}
                                        onChange={handleChange} />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="inputPreco" className="form-label mb-1 fw-bold">Preço:</label>
                                    <input type="text" className="form-control" id="inputPreco"
                                        name="preco"
                                        value={formData.preco || ""}
                                        onChange={handleChange} />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="categoriaID" className="form-label mb-1 fw-bold">Categoria id:</label>
                                    <select id="categoriaID" className="form-select" defaultValue={0}
                                        name="categoria"
                                        onChange={(e) => handleChange(e)}>

                                        <option value={0} disabled>
                                            Selecione a categoria...
                                        </option>

                                        {categorias?.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.nomeCat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="inputDesc" className="form-label mb-1 fw-bold">Descrição:</label>
                                    <textarea rows={5} className="form-control" id="inputDesc"
                                        name="descricao"
                                        value={formData.descricao || ""}
                                        onChange={handleChange} >
                                    </textarea>
                                </div>
                                
                                <div className="col-md-12">
                                <ImageUploaderModal
                                    setFile={setChosenFile}
                                    setImage={setImage} 
                                    chosenImage={chosenImage} />
                                </div>

                                <div className="col-12 my-2">
                                    <button type="Submit" className="btn btn-primary">
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

export default Cad_prod