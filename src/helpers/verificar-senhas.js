import bcrypt from "bcrypt";

async function verificarSenha (senha, senhaHash) {
    const verificacaoDeSenha = await bcrypt.compare(senha, senhaHash);
    return verificacaoDeSenha;
}

export { verificarSenha };