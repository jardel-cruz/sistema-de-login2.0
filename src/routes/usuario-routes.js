import { Router } from "express";

import { usuarioControllers } from "../api/controllers/usuario-controller.js";
import { loginMiddleware } from "../middlewares/middleware-acesso.js";

import { teste } from "../../teste.js";

const usuarioRouter = Router({ caseSensitive: true });

usuarioRouter
    .get("/usuario/confirmar_email/:token", usuarioControllers.confirmarEmail)
    .post("/usuario", usuarioControllers.cadastroDeUsuarios)
    .post("/usuario/login", loginMiddleware, usuarioControllers.login)
    .post("/usuario/logout")
    .get ("/teste", teste)
    
export { usuarioRouter };