import nodemailer from "nodemailer";
import { emailEnv } from "../../configs/envs.js";

async function enviarEmail (emailUsuario, assunto, html) {
    const transport = nodemailer.createTransport({
        host: emailEnv.host,
        port: emailEnv.port,
        secure: true,
        auth: {
            user: emailEnv.usuario,
            pass: emailEnv.senha
        }
    })

    return transport.sendMail({
        from: `Gerenciador de arquivos <${emailEnv.usuario}>`,
        to: emailUsuario,
        subject: assunto,
        html: html,
    })
}

export { enviarEmail };