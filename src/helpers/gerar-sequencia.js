import { randomBytes } from "crypto";
import { promisify } from "util";

const randomBytesAsync = promisify(randomBytes);

async function gerarSequenciaAleatoria (quantidadeDeCaracteres = 10) {
    const sequencia = (await randomBytesAsync(quantidadeDeCaracteres)).toString("hex");

    return sequencia;
}

export { gerarSequenciaAleatoria };