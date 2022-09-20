import moment from "moment";

import { enviarEmailConfirmacao } from "../../helpers/email-verificacao.js";
import { gerarDadosDoUsuario } from "../../helpers/gerar-dados-usuario.js";
import { manipuladorUsuario } from "../repositories/usuario-repositorio.js";
import { allowRepositorio, blockRepositorio } from "../repositories/repositorie-redis.js";
import { tokenOpaco } from "../../helpers/gerarar-token-opaco.js";
import { segurancaEnv } from "../../configs/envs.js";
import { gerarJwt } from "../../helpers/gerar-validar-jwt.js";

const usuarioDb = manipuladorUsuario()

const usuarioService = {
    async criacaoDeUsuarios (dados) {
        const dadosValidados = await gerarDadosDoUsuario(dados);
        const usuario = await usuarioDb.criarUsuario(dadosValidados);
        const tokenDeVerificacao = await tokenOpaco(25, usuario.id);
        
        enviarEmailConfirmacao(usuario.email, tokenDeVerificacao);

        return "Criado";
    },

    async confirmacaoDeEmail (tokenDeVerificacao) {
        const usuarioId = await allowRepositorio.buscarDaMemoria(tokenDeVerificacao);
        const usuarioAtualizado = await usuarioDb.atualizarUsuario(usuarioId, {emailVerificado: true});
        
        await allowRepositorio.deletarDaMemoria(tokenDeVerificacao);
        
        return usuarioAtualizado;
    },

    async login (usuario) {
        const { id, cargo } = usuario
        const accessToken = await gerarJwt({ id, cargo }, segurancaEnv.chaveJWT, "15m");
        const refreshToken = await tokenOpaco(25);

        usuario.refreshToken = refreshToken;
        usuario.validade = moment().add(2, "days").unix();
        await usuario.save();
        
        return { refreshToken, accessToken };
    },

    async logout (id, accessToken) {
        await blockRepositorio.salvarEmMemoria(accessToken, "", moment().add(5, "minutes").unix());
        await usuarioDb.atualizarUsuario(id, {refreshToken: "", validade: 0});

        return "ok"
    }
}

export { usuarioService };