import passport from "passport";
import local from "passport-local";
import bearer from "passport-http-bearer"

import { manipuladorUsuario } from "../api/repositories/usuario-repositorio.js";
import { verificarSenha } from "../helpers/verificar-senhas.js";
import { verificarJwt } from "../helpers/gerar-validar-jwt.js";
import { segurancaEnv } from "../configs/envs.js";

const usuarioRepositorio = manipuladorUsuario();

const localStrategy = new local.Strategy(
    {
        usernameField: "email",
        passwordField: "senha",
        session: false
    },
    async (email, senha, done) => {
        try {
            const camposDoUsuario = "id email senha emailVerificado refreshToken, cargo";
            const usuario = await usuarioRepositorio.buscarUsuario({email: email}, camposDoUsuario);
            
            if (!usuario) throw "Credenciais invalidas";
            if(usuario.emailVerificado === false) throw "Esse usuario não confirmou seu email";

            if ((await verificarSenha(senha, usuario.senha)) !== true) throw "Credenciais invalidas"; 

            return done(null, usuario);
        } catch (error) {
            return done(error);
        }
    }
);

const bearerStrategy = new bearer.Strategy(
    async (token, done) => {
        
        try {
            const payload = await verificarJwt(token, segurancaEnv.chaveJWT);
            return done(null, payload, { token });
        } catch (error) {
            return done(error)
        }

    }
)

passport.use(localStrategy);
passport.use(bearerStrategy);

export { passport };