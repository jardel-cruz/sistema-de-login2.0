import { usuarioService } from "../services/usuario-service.js";

const usuarisControllers = {
    async cadastroDeUsuarios (req, res) {
        try {
            const resposta = await usuarioService.criacaoDeUsuarios(req.body);

            return res.status(200).json({ resposta: resposta });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    async confirmarEmail (req, res) {
        try {
            const resposta = req.params.token;

            return res.status(200).json({ resposta: resposta });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}

export { usuarisControllers };