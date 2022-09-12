import { enviarEmail } from "../api/subscribe/envio-de-emails.js";
import { servidorEnv } from "../configs/envs.js";

async function enviarEmailConfirmacao (emailDoDestinatario, tokenVerificaEmail) {
    const assunto = "Confirmação de email.";
    const uri = `http://${servidorEnv.host}/usuario/confirmar_email/${tokenVerificaEmail}`;
    const html = `<h1>Email de Confirmação</h1><a href = ${uri}> Click aqui para confirmar </a>`;
    console.log(assunto, html);
    await enviarEmail(emailDoDestinatario, assunto, html);
}

export { enviarEmailConfirmacao };
