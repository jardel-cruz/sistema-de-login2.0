import { Usuario } from "../models/usuario-skima.js";

function manipuladorUsuario () {
    return {
        async criarUsuario (dados) {
            const novoUsuario = await Usuario.create(dados);

            return novoUsuario;
        }
    }
}

export { manipuladorUsuario };