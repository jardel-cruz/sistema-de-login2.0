import { AccessControl } from "accesscontrol";

const controle = new AccessControl();

controle
    .grant("assinante")
    .readAny("post", ["id", "titulo", "conteudo", "altor"]);

controle
    .grant("editor")
    .extend("assinante")
    .createOwn("post")
    .deleteOwn("post")
    .updateOwn("post")

controle
    .grant("admin")
    .extend("assinante")
    .createOwn("post")
    .readAny("usuario")
    .deleteAny("post")
    .deleteAny("usuario")
    .updateOwn("post")
    .updateOwn("usuario")

export { controle };