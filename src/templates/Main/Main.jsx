import './main.css'

import { Link, useNavigate } from "react-router-dom"
import lebronXX from '../../assets/images/LebronXX.jpg'
import clarck from '../../assets/images/clarck.jpg'
import bullsjersey from '../../assets/images/Bulls_MJ.jpg'
import luka from '../../assets/images/luka.jpg'
import bola from '../../assets/images/Bola_wilson.jpg'
import { useState } from "react"
import MensagemService from "../../services/MensagemService"
import Footer from '../../components/Footer/Footer'


const Main = () => {
    const objectValues = {
        email: "",
        emissorMensagem: "",
        texto: "",
        telefone: "",
        statusMensagem: "",
    };
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(formData => ({ ...formData, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);
        if (formData.emissorMensagem != undefined && formData.email != undefined && formData.texto != undefined) {
            MensagemService.create(formData).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                }, (error) => {
                    const message = error.response.data.message;
                    setMessage(message);
                }
            )
        }
    }

    const VerProduto = (id) => {
        navigate(`/pagproduto/` + id)
    }

    document.title = 'New Vision Store';
    
    return (
        <div className="body">

            <div className="panel">


                <div className='d-flex justify-content-around align-items-center text-align-center'>
                    <div>
                        <h1>Procurando seu tênis novo?</h1>
                        <h1>Conheça a NEW VISION!</h1>
                        <a className="panelbtn" href="#prods">Conheça nossos Produtos!!!</a>
                    </div>
                    <div>
                        <img className='pannelimg' src={lebronXX} />
                    </div>
                </div>


            </div>
            <div className="Quem">
                <div className="txtqm">
                    <h1>Quem somos</h1>
                    <h3>
                        Uma nova loja online especializada em
                        materiais para basquete oferecemos uma ampla seleção de produtos, desde bolas de alta performance até
                        calçados e acessórios essenciais para treinamento. Inspirados pela paixão pelo esporte e pela inovação
                        digital, nos dedicamos a proporcionar uma experiência de compra conveniente e de alta qualidade para
                        todos os amantes do basquete no Brasil. Com um site e um app intuitivo e um compromisso com o serviço
                        e com a satisfação do cliente.
                    </h3>
                </div>
                <div>
                    <img src={clarck} />
                </div>
            </div>
            <div className="title" id="prods">
                <h1>Destaques:</h1>
            </div>

            <div className="containers">
                <div className="Produtos">
                    <div>

                        <img className="card-img-top" src={lebronXX} />
                        <div className="card-body">
                            <div className="titleprod">

                                <h4>Nike Lebron XX "The Debut"</h4>

                                <h4>R$949,99</h4>
                            </div>
                        </div>

                        <button type="button" onClick={() => VerProduto(3)}
                            className="btnj">
                            <i></i>Ver Produto
                        </button> 
                    </div>
                </div>
                <div className="Produtos">
                    <div>

                        <img className="card-img-top" src={bola} />
                        <div className="card-body">
                            <div className="titleprod">

                                <h4>Bola Wilson NBA</h4>
                                <h4>R$159,90</h4>
                            </div>
                        </div>

                        <div className="card-footer">
                        <button type="button" onClick={() => VerProduto(4)}
                            className="btnj">
                            <i></i>Ver Produto
                        </button> 
                        </div>
                    </div>
                </div>
                <div className="Produtos">
                    <div>

                        <img className="card-img-top" src={bullsjersey} />
                        <div className="card-body">
                            <div className="titleprod">

                                <h4>Bulls Classic Jersey MJ</h4>
                                <h4>R$1199.90</h4>
                            </div>
                        </div>

                        <div className="card-footer">
                            <div>

                                <button className='btnj'
                                    onClick={() => VerProduto(2)}>
                                    Ver Produto</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Fale">
                <div>
                    <img src={luka} />
                </div>
                <div id="txtfale">
                    <div className="d-flex justify-content-center">
                        <form className="form-fale row g-2 rounded-2 shadow " onSubmit={handleSubmit} action='/main'>
                            <p id='faleconosco' className="h3 text-center">Fale Conosco</p>
                            {!successful && (
                                <>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="inputEmissor" className="form-label mb-1 fw-bold">Nome:</label>
                                        <input type="text" className="form-control" id="inputEmissor" required
                                            name="emissorMensagem"
                                            value={formData.emissorMensagem || ""}
                                            onChange={handleChange} />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="inputEmail" className="form-label mb-1 fw-bold">Email:</label>
                                        <input type="email" className="form-control" id="inputEmail" required
                                            name="email"
                                            value={formData.email || ""}
                                            onChange={handleChange} />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="inputTelefone" className="form-label mb-1 fw-bold">Telefone *(opcional):</label>
                                        <input type="text" className="form-control" id="inputTelefone"
                                            name="telefone"
                                            value={formData.telefone || ""}
                                            onChange={handleChange} />
                                    </div>
                                    <div className="col-md-12 mb-1">
                                        <label htmlFor="inputTexto" className="form-label mb-1 fw-bold">Mensagem:</label>
                                        <textarea rows={4} className="form-control" id="inputTexto" required
                                            name="texto"
                                            value={formData.texto || ""}
                                            onChange={handleChange}>
                                        </textarea>
                                    </div>
                                    <div className="col-md-12 mb-1 d-flex flex-row-reverse">
                                        <button className="btn btn-primary">Enviar</button>
                                    </div>
                                </>
                            )}
                            {message && (
                                <div className="m-1">
                                    <div className={"text-center h4 fst-italic py-4 rounded-2 border border-5 " + (successful ? "border-success" : "border-danger")}>
                                        {message}
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>



                </div>
            </div>
            <div id="onde" className="ondeest  my-4">
                <div className='ondeesttxt'><h1>Onde Estamos</h1>
                    <p className="text-center mx-3 fs-3 fw-bold fst-italic">

                        <i className="bi bi-geo-alt-fill"></i>
                        RR. Interna Grupo Bandeirante, 138 - Jardim Belval, Barueri - SP, 06420-150 <br />
                        <i className="bi bi-telephone-fill"></i>
                        <a href="https://wa.me/551140028922">(011) 4002-8922</a>
                    </p>
                </div>
                <div className='d-flex justify-content-around align-items-center'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.560411723444!2d-46.8923559238854!3d-23.512337959794504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf03e63bc7a06d%3A0xc14462a7d6d04032!2sITB%20Bras%C3%ADlio%20Flores%20de%20Azevedo%20(FIEB)!5e0!3m2!1spt-BR!2sbr!4v1717680155426!5m2!1spt-BR!2sbr"
                        width="600" height="450" style={{ border: 0, margin: 30 }} allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Main