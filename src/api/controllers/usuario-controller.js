import { usuarioService } from "../services/usuario-service.js";

const usuarioControllers = {
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
            const { token } = req.params;
            const resposta = await usuarioService.confirmacaoDeEmail(token);

            return res.status(200).json({ resposta: resposta });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    async login (req, res) {
        try {
            const usuario = req.user;
            const { accessToken, refreshToken } = await usuarioService.login(usuario)
            
            res.set("Authorization", accessToken);
            return res.status(200).json({ refreshToken });
        } catch (error) {
            console.log(error)
            return res.status(500).json(error.message);
        }
    }, 

    async logout (req, res) {
        try {
            const { accessToken } = req;
            const { id } = req.user;

            const resultado = await usuarioService.logout(id, accessToken);

            return res.status(202).json({ msg: resultado });
        } catch (error) {
            return res.status(500).json(error.message);
        }      
    }
}

export { usuarioControllers };