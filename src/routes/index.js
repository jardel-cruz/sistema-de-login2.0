import { usuarioRouter } from "./usuario-routes.js";

export const router = app => {
    app.use(usuarioRouter);
}