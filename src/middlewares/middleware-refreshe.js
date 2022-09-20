import moment from "moment";

import { manipuladorUsuario } from "../api/repositories/usuario-repositorio.js";

const usuarioDb = manipuladorUsuario()

async function refreshMiddleware (req, res, next) {
    try {
        const { refreshToken } = req.body;

        const usuario = await buscarUsuarioPeloToken(refreshToken);
        await validarRefreshTokenDoUsuario(usuario);    

        req.user = usuario;
        return next()
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}

async function buscarUsuarioPeloToken (refreshToken) {
    
    const usuario = await usuarioDb.buscarUsuario({ refreshToken }, "id email senha emailVerificado refreshToken cargo");
    if(!usuario) throw "RefreshToken invalido";

    return usuario;
}

async function validarRefreshTokenDoUsuario (usuario) {
    const dataAtual = moment().unix();
    if (usuario.validade < dataAtual) throw "RefreshToken invalido";
}
export { refreshMiddleware };