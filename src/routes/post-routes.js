import { Router } from "express";
import { postControllers } from "../api/controllers/post-controllers.js";
import { tentarAutenticar } from "../middlewares/tentarAutenticar.js";
import { tentarAutorizar } from "../middlewares/tentarAutorizar.js";
import { accessMiddleware, loginMiddleware } from "../middlewares/middleware-acesso.js";
import { gerenciarPermicoes } from "../middlewares/middleware-cargos.js"

const postRouter = Router({ caseSensitive: true });

postRouter
    .get("/post", [tentarAutenticar, tentarAutorizar("post", "ler")], postControllers.mostrarPost)
    .get("/post/:id", [accessMiddleware, gerenciarPermicoes("post", "ler")])
    .post("/post", [accessMiddleware, gerenciarPermicoes("post", "criar")], postControllers.adicionarPost)
    .put("/post/editar/:id", [accessMiddleware, gerenciarPermicoes(["editor", "admin", "assinante"])], postControllers.editarPost)
    .delete("/post/delete/:postId", [accessMiddleware, loginMiddleware, gerenciarPermicoes("post", "remover")], postControllers.excluirPost)


export { postRouter };