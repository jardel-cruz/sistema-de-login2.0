import { manipuladorPost } from "../repositories/post-repositorio.js"
import { gerarPost } from "../../helpers/gerar-post.js"

const postDb = manipuladorPost();

const postServices = {
    async criarPost (dados, usuarioId) {
        const postValido = await gerarPost(dados, usuarioId);
        const novoPost = await postDb.criarPost(postValido);

        return novoPost;
    },

    async mostrarPost () {
        const resposta = await postDb.buscarTodosPosts();

        return resposta;
    },

    async mostrarUmPost (postId) {
        const resposta = await postDb.buscarPostPorId(postId);

        return resposta;
    },

    async editarPost (postId, campos) {
        const postAtualizado = await postDb.atualizarPost(postId, campos);

        return postAtualizado;
    },

    async excluirPosts (postId, acesso) {
        if (acesso.todos.permitido === true) {
            const postExcluido = await postDb.excluir(postId);

            return postExcluido;
        }
        if (acesso.apenasSeu.permitido === true) {
            const postExcluido = await postDb.buscarExcluir({altor: acesso.apenasSeu.id, id: postId});
            if (postExcluido === null) throw "Erro ao excluir o post";

            return postExcluido;
        }
    }
}

export { postServices };