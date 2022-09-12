import { manipuladorUsuario } from "./src/api/repositories/usuario-repositorio.js"
const usuarioDb = manipuladorUsuario()

async function teste (req, res) {
    const usuario = await usuarioDb.buscarUsuario({refreshToken: "8e41fd65b034fa5117c0a8381fe4040f0093cbdee8b71d5086" })
    console.log(usuario)

    res.status(200).json(usuario)
}

export {teste} 