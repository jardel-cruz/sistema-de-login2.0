export function cabecalhoDeRequisicao (req, res, next) {
    res.set("X-Powered-By", "PHP/7.1.7");

    return next();
}