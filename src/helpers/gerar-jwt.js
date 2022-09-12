import jwt from "jsonwebtoken";
import { promisify } from "util";
const jwtSignAsync = promisify(jwt.sign);

async function gerarJwt (payload = {}, chaveDeSeguranca, expiraEm) {
    const jwtToken =  jwtSignAsync(payload, chaveDeSeguranca, {expiresIn: expiraEm});
    console.log(jwtToken)
    return jwtToken;
}

export { gerarJwt }