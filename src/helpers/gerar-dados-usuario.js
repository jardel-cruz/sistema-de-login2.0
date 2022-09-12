import bcrypt from "bcrypt";

import { validarEmail, validarNome, validarSenha } from "../validators/validacoes-comuns.js";

async function gerarDadosDoUsuario (dados) {
    const { nome, email, senha} = dados;
    const array = [
        ["nome", await validarNome(nome)],
        ["email", await validarEmail(email)],
        ["senha", await validarSenha(senha)]
    ];
    const camposInvalidos = array.filter(item =>  item[1] !== true);

    if (camposInvalidos.length > 0) {
        throw {
            status: 400,
            camposInvalidos: camposInvalidos
        };
    }

    const senhaHash = await bcrypt.hash(senha, 15);

    return {
        nome, email, senha: senhaHash
    }
}

export { gerarDadosDoUsuario };