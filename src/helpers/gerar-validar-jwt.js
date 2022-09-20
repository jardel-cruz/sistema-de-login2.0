import jwt from "jsonwebtoken";
import { promisify } from "util";
import { blockRepositorio } from "../api/repositories/repositorie-redis.js";

// const jwtSignAsync = promisify(jwt.sign).bind(jwt);
// const jwtVerifyAsync = promisify(jwt.verify).bind(jwt)

async function gerarJwt (payload = {}, chaveDeSeguranca, expiraEm) {
    const jwtToken = jwt.sign(payload, chaveDeSeguranca, {expiresIn: expiraEm});
    return jwtToken;
}

async function verificarJwt (tokenJwt, chaveDeSeguranca) {
    try {
        const tokenBloqueado = await blockRepositorio.conferirValorNaMemoria(tokenJwt);
        if (tokenBloqueado) throw "Token invalido";
        const resultado = jwt.verify(tokenJwt, chaveDeSeguranca);
        
        return resultado;
    } catch (error) {
        throw "Token invalido";
    }
}

export { gerarJwt, verificarJwt };