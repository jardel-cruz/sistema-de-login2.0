import { postServices } from "../services/post-services.js";

const postControllers = {
    async adicionarPost (req, res) {
        try {
            const { id } = req.user;
            const { body } = req;
            const resposta = await postServices.criarPost(body, id);

            return res.status(200).json({resposta});
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    async mostrarPost (req, res) {
        try {
            let post = await postServices.mostrarPost(req.autenticado);
            
            return res.status(200).json(post);
        } catch (error) {
            return res.status(400).json(error.message);
        }
    },

    async mostrarUmPost (req, res) {
        try {
            const { id } = req.params;
            const post = await postServices.mostrarUmPost(id);
            
            return res.status(200).json(post);
        } catch (error) {
            return(400).json({ error });
        }
    },

    async editarPost (req, res) {
        try {
            const { id } = req.params;
            const { titulo, conteudo } = req.body;
            const resultado = await postServices.editarPost(id, { titulo, conteudo });
            
            return res.status(200).json(resultado);
        } catch (error) {
            return(400).json({ error });
        }
    },

    async excluirPost (req, res) {
        try {
            const { postId } = req.params;
            const { acesso } = req;
            const resultado = await postServices.excluirPosts(postId, acesso);
            
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(400).json({msg: error});
        }
    },
}

export { postControllers };