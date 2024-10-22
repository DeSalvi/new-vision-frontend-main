import http from "../common/http-common";
const API_URL = "produto/";

const findAll = () => {
  return http.mainInstance.get(API_URL + "findAll");
};

const findById = id => {
  return http.mainInstance.get(API_URL + `findById/${id}`);
};

const create = (data) => {
  const formData = new FormData();

  formData.append('nome', data.nome);
  formData.append('descricao', data.descricao);
  formData.append('codigoBarras', data.codigoBarras);
  formData.append('preco', data.preco);
  formData.append('categoria', data.categoria);

  return http.mainInstance.post(API_URL + "create", formData);
};

const alterar = (file, id, data) => {
    const formData = new FormData();
  
    formData.append('file', file);
    formData.append('nome', data.nome);
    formData.append('descricao', data.descricao);
    formData.append('preco', data.preco);
    formData.append('categoria', data.categoria);
  
    for (const key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    } 
  
    return http.multipartInstance.put(API_URL + `alterar/${id}`, formData);
  };
  

const createComFoto = (file, data) => {
    const formData = new FormData();
  
    formData.append('file', file);
    formData.append('nome', data.nome);
    formData.append('descricao', data.descricao);
    formData.append('codigoBarras', data.codigoBarras);
    formData.append('preco', data.preco);
    formData.append('categoria', data.categoria);
  
    for (const key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    } 
  
    return http.multipartInstance.post(API_URL + "createComFoto", formData);
  };

  const inativar = (id) => {
    return http.mainInstance.put(API_URL + `inativar/${id}`);
};


const ProdutoService = {
  findAll,
  findById,
  create,
  alterar,
  createComFoto,
  inativar,

};

export default ProdutoService;
 