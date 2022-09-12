import dotenv from "dotenv";
dotenv.config();

const envObj = process.env;

const servidorEnv = {
    host: envObj.HOST,
    porta: envObj.PORTA
};

const segurancaEnv = {
    chaveJWT: envObj.CHAVE_JWT
};

const dbEnv = {
    usuario: envObj.USUARIO_DB,
    senha: envObj.SENHA_DB,
};

const emailEnv = {
    usuario: envObj.USER_EMAIL,
    senha: envObj.USER_PASSWORD,
    host: envObj.HOST_EMAIL,
    port: envObj.PORT_EMAIL
};

export { dbEnv, emailEnv, envObj, segurancaEnv, servidorEnv };