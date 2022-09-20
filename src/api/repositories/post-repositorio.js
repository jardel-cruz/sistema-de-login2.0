import { Post } from "../models/posts-schema.js";

function manipuladorPost () {
    return {
        async criarPost (dados) {
            const novoPost = await Post.create(dados);

            return novoPost;
        },

        async buscarPostPorId (usuarioId, campos) {
            const post = await Post.findById(usuarioId, campos);

            return post;
        },

        async buscarUmPosts (camposDeFiltro = {}, camposTrazidos) {
            const post = await Post.findOne(camposDeFiltro, camposTrazidos);

            return post;
        },

        async buscarTodosPosts (camposDeFiltro = {}, camposTrazidos) {
            const post = await Post.find(camposDeFiltro, camposTrazidos);

            return post;
        },

        async atualizarPost (usuarioId, campos = {}) {
            await Post.findByIdAndUpdate(usuarioId, campos);

            return "Ok";
        },

        async excluir (postId) {
            const postExcluido = await Post.findByIdAndRemove(postId);

            return postExcluido;
        },

        async buscarExcluir (campos = {}) {
            const post = await Post.findOneAndDelete(campos);

            return post;
        }
    }
}

export { manipuladorPost };