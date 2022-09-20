import { validarConteudo, validarTitulo } from "../validators/validacoes-comuns.js"

async function gerarPost (dados, usuarioId) {
    const { titulo, conteudo } = dados;
    const array = [
        ["titulo", await validarTitulo(titulo)],
        ["conteudo", await validarConteudo(conteudo)]
    ];
    const camposInvalidos = array.filter(item =>  item[1] !== true);

    if (camposInvalidos.length > 0) {
        throw {
            status: 400,
            camposInvalidos: camposInvalidos
        };
    }

    return {
        titulo,
        conteudo,
        altor: usuarioId
    }
}

export { gerarPost };