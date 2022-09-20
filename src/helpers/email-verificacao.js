import { enviarEmail } from "../api/subscribe/envio-de-emails.js";
import { servidorEnv } from "../configs/envs.js";

async function enviarEmailConfirmacao (emailDoDestinatario, tokenVerificaEmail) {
    const assunto = "Confirmação de email.";
    const uri = `http://${servidorEnv.host}/usuario/confirmar_email/${tokenVerificaEmail}`;
    const html = `<h1>Email de Confirmação</h1><a href = ${uri}> Click aqui para confirmar </a>`;
    //exibira a uri no console, para enviar de fato o email retire o comentário da linha 10
    console.log(uri);
    // await enviarEmail(emailDoDestinatario, assunto, html);
}

export { enviarEmailConfirmacao };
