import { enviarEmailConfirmacao } from "../../helpers/email-verificacao.js";
import { gerarDadosDoUsuario } from "../../helpers/gerar-dados-usuario.js";
import { manipuladorUsuario } from "../repositories/usuario-repositorio.js";
import { allowRepositorio } from "../repositories/repositorie-redis.js";
import { tokenOpaco } from "../../helpers/gerarar-token-opaco.js";
import { segurancaEnv } from "../../configs/envs.js";
import { gerarJwt } from "../../helpers/gerar-jwt.js";

const usuarioDb = manipuladorUsuario()

const usuarioService = {
    async criacaoDeUsuarios (dados) {
        const dadosValidados = await gerarDadosDoUsuario(dados);
        const usuario = await usuarioDb.criarUsuario(dadosValidados);
        const tokenDeVerificacao = await tokenOpaco(25, usuario.id);
        
        // enviarEmailConfirmacao(usuario.email, tokenDeVerificacao);

        return "Criado";
    },

    async confirmacaoDeEmail (tokenDeVerificacao) {
        const usuarioId = await allowRepositorio.buscarDaMemoria(tokenDeVerificacao);
        if (!usuarioId) throw "Erro ao verificar email";
        const usuarioAtualizado = await usuarioDb.atualizarUsuario(usuarioId, {emailVerificado: true});
        await allowRepositorio.deletarDaMemoria(tokenDeVerificacao);

        return usuarioAtualizado;
    },

    async login (usuario) {
        const { id } = usuario
        const accessToken = await gerarJwt({ id }, segurancaEnv.chaveJWT, "15m");
        const refreshToken = await tokenOpaco(25);
        usuario.refreshToken = refreshToken;
        await usuario.save();
        
        return { refreshToken, accessToken };
    }
}

export { usuarioService };