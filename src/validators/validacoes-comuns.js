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

async function validarTitulo (titulo) {
    return !!titulo && titulo.length > 3;
}

async function validarConteudo (conteudo) {
    return !!conteudo && conteudo.length > 5 && conteudo.length < 50;
}

export { validarEmail, validarNome, validarSenha, validarConteudo, validarTitulo };