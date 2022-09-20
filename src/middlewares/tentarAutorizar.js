import { gerenciarPermicoes } from "./middleware-cargos.js";

export function tentarAutorizar (entidade, acao) {
    return (req, res, next) => {
        if (req.autenticado === true) {
            return gerenciarPermicoes(entidade, acao)(req, res, next);
        }

        return next();
    }
}