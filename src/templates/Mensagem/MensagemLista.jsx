import { Link, useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useState } from "react"
import MensagemService from "../../services/MensagemService"

const Mensagem_nv = () => {
    const navigate = useNavigate();
    const [mensagens, setMensagens] = useState([]);

    useEffect(() => {
        MensagemService.findAll().then(
            (response) => {
                const mensagens = response.data;
                setMensagens(mensagens);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);

    const lerMensagem = (id) => {
        navigate(`/mensagemler/` + id)
    }

    document.title = 'New Vision Store';

    return (
        <div className="d-flex">
        <Sidebar />
        <div className="p-3 w-100">
            <Header
                goto={'/mensagemnv'}
                title={'Mensagem'}
                logo={logo}
            />
                <section className="p-2 m-2 shadow-lg">
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Data emissão</th>
                                    <th scope="col">Emissor</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Telefone</th>
                                    <th scope="col">Texto</th>
                                    <th scope="col">Conteudo</th>
                                    <th scope="col">Ver conteudo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mensagens?.map((mensagem) => (
                                    <tr key={mensagem.id}>
                                        <td scope="row">{mensagem.dataMensagem}</td>
                                        <td>{mensagem.emissorMensagem}</td>
                                        <td>{mensagem.email}</td>
                                        <td>{mensagem.telefone}</td>
                                        <td>{mensagem.texto}</td>
                                        <td>{mensagem.statusMensagem}</td>
                                        <td>
                                            <button type="button" onClick={() => lerMensagem(mensagem.id)}
                                                className="btn btn-sm btn-warning">
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

export default Mensagem_nv