import { usuarioRouter } from "./usuario-routes.js";
import { postRouter } from "./post-routes.js"

export const router = app => {
    app.use(usuarioRouter);
    app.use(postRouter);
}