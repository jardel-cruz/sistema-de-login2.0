async function validarNome (nome) {
    return !!nome && nome.length > 3;
}

async function validarSenha (senha) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#\.])(?:([0-9a-zA-Z$*&@#\.])){8,}$/;
    return !!senha && regex.test(senha);
}

async function validarEmail (email) {
    const regex = /\S+@\S+\.\S+/;
    return !!email && regex.test(email);
}

export { validarEmail, validarNome, validarSenha };