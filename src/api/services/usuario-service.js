import { enviarEmailConfirmacao } from "../../helpers/email-verificacao.js";
import { gerarDadosDoUsuario } from "../../helpers/gerar-dados-usuario.js";
import { manipuladorUsuario } from "../repositories/usuario-repositorio.js";
import { gerarSequenciaAleatoria } from "../../helpers/gerar-sequencia.js";
import { allowRepositorio } from "../repositories/repositorie-redis.js";

const usuarioDb = manipuladorUsuario()

const usuarioService = {
    async criacaoDeUsuarios (dados) {
        const dadosValidados = await gerarDadosDoUsuario(dados);
        const usuario = await usuarioDb.criarUsuario(dadosValidados);
        const tokenDeVerificacao = await gerarSequenciaAleatoria(25);
        await allowRepositorio.salvarEmMemoria(tokenDeVerificacao, usuario.id);
        
        enviarEmailConfirmacao(usuario.email, tokenDeVerificacao);

        return "ok";
    }
}

export { usuarioService };