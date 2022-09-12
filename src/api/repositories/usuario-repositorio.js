import { Usuario } from "../models/usuario-skima.js";

function manipuladorUsuario () {
    return {
        async criarUsuario (dados) {
            const novoUsuario = await Usuario.create(dados);

            return novoUsuario;
        },

        async buscarUsuarioPorId (usuarioId, campos) {
            const usuario = await Usuario.findById(usuarioId, campos);

            return usuario;
        },

        async buscarUsuario (camposDeFiltro = {}, camposTrazidos) {
            const usuario = await Usuario.findOne(camposDeFiltro, camposTrazidos);

            return usuario;
        },

        async atualizarUsuario (usuarioId, campos = {}) {
            await Usuario.findByIdAndUpdate(usuarioId, campos);

            return "Ok";
        }
    }
}

export { manipuladorUsuario };