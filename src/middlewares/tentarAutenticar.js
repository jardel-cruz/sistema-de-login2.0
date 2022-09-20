import { accessMiddleware } from "./middleware-acesso.js";

export async function tentarAutenticar (req, res, next) {
    if (req.get("Authorization")) {
        return await accessMiddleware(req, res, next);
    }
    req.autenticado = false;
    return next();
}