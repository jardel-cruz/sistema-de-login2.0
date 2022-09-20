import { randomBytes } from "crypto";
import { promisify } from "util";
import { allowRepositorio } from "../api/repositories/repositorie-redis.js";

const randomBytesAsync = promisify(randomBytes);

async function tokenOpaco (bytes , salvarNaMemoria = "", validade) {
    const tokenDeVerificacao = (await randomBytesAsync(bytes)).toString("hex");
    if (salvarNaMemoria) await allowRepositorio.salvarEmMemoria(tokenDeVerificacao, salvarNaMemoria, validade);

    return tokenDeVerificacao;
}

export { tokenOpaco };