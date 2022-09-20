import { Router } from "express";

import { usuarioControllers } from "../api/controllers/usuario-controller.js";
import { loginMiddleware, accessMiddleware } from "../middlewares/middleware-acesso.js";
import { refreshMiddleware } from "../middlewares/middleware-refreshe.js";

const usuarioRouter = Router({ caseSensitive: true });

usuarioRouter
    .get("/usuario/confirmar_email/:token", usuarioControllers.confirmarEmail)
    .post("/usuario", usuarioControllers.cadastroDeUsuarios)
    .post("/usuario/login", loginMiddleware, usuarioControllers.login)
    .post("/usuario/logout", accessMiddleware, usuarioControllers.logout)
    .post("/usuario/refresh", refreshMiddleware, usuarioControllers.login)

export { usuarioRouter };