import { Router } from "express";
import { usuarisControllers } from "../api/controllers/usuario-controller.js";

const usuarioRouter = Router({ caseSensitive: true });

usuarioRouter
    .get("/usuario/confirmar_email/:token", usuarisControllers.confirmarEmail)
    .post("/usuario", usuarisControllers.cadastroDeUsuarios)
    .post("/usuario/login")
    .post("/usuario/logout")
    
export { usuarioRouter };