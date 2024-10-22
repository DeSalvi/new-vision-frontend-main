import http from '../common/http-common';
const API_URL = "usuario/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};

const signup = (nome, email, password) => {
    return http.mainInstance.post(API_URL + "signup", {
        nome,
        email,
        password,
    });
};

const signin = async (re, senha) => {
    const response = await http.mainInstance
        .post(API_URL + "signin", {
            re,
            senha,
        });
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const create = data => {
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('re', data.re);
    formData.append('nivelAcesso', data.nivelAcesso);

    return http.mainInstance.post(API_URL + "create", formData);
};

const alterar = (id, data) => {
    const formData = new FormData();

    formData.append('nome', data.nome);
    formData.append('re', data.re);
    formData.append('nivelAcesso', data.nivelAcesso);

    for (const key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }

    return http.mainInstance.put(API_URL + `alterar/${id}`, formData);
};


const update = (id, data) => {
    return http.multipartInstance.put(API_URL + `update/${id}`, data);
};

const alterarSenha = (id, data) => {
    const formData = new FormData();
    formData.append('senha', data.senha);

    return http.mainInstance.put(API_URL + `alterarSenha/${id}`, formData);
};

const findByNome = nome => {
    return http.mainInstance.get(API_URL + `findByNome?nome=${nome}`);
};

const inativar = (id) => {
    return http.mainInstance.put(API_URL + `inativar/${id}`);
};

const reativar = (id) => {
    return http.mainInstance.put(API_URL + `reativar/${id}`);
};


const UsuarioService = {
    findAll,
    findById,
    signup,
    signin,
    logout,
    getCurrentUser,
    create,
    alterar,
    inativar,
    reativar,
    update,
    alterarSenha,
    findByNome,
}

export default UsuarioService;