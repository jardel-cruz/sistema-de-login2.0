import { gerarSequenciaAleatoria } from "./gerar-sequencia.js";
import { allowRepositorio } from "../api/repositories/repositorie-redis.js";

async function tokenOpaco (bytes , salvarNaMemoria = "") {
    const tokenDeVerificacao = await gerarSequenciaAleatoria(bytes);
    if (salvarNaMemoria) await allowRepositorio.salvarEmMemoria(tokenDeVerificacao, salvarNaMemoria);

    return tokenDeVerificacao;
}

export { tokenOpaco };