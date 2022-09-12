import passport from "passport";
import { Strategy } from "passport-local";

import { manipuladorUsuario } from "../api/repositories/usuario-repositorio.js";
import { verificarSenha } from "../helpers/verificar-senhas.js";

const usuarioRepositorio = manipuladorUsuario()

const localStrategy = new Strategy(
    {
        usernameField: "email",
        passwordField: "senha",
        session: false
    },
    async (email, senha, done) => {
        try {
            const usuario = await usuarioRepositorio.buscarUsuario({email: email}, "id email senha emailVerificado refreshToken");
            
            if (!usuario) throw "Credenciais invalidas";
            if(usuario.emailVerificado === false) throw "Esse usuario não confirmou seu email";

            if ((await verificarSenha(senha, usuario.senha)) !== true) throw "Credenciais invalidas"; 

            return done(null, usuario);
        } catch (error) {
            return done(error);
        }
    }
);

passport.use(localStrategy);

export { passport };