import { controle } from "../security/controle-de-acesso.js";

const metodos = {
    ler: {
        todos: "readAny",
        apenasSeu : "readOwn"
    },
    criar: {
        todos: "createAny",
        apenasSeu: "createOwn"
    },
    remover: {
        todos: "deleteAny",
        apenasSeu: "deleteOwn"
    }
}

function gerenciarPermicoes (entidade , acoa) {
    
    return async (req, res, next) => {
        try {
            const { cargo, id } = req.user;
            const permicoesDoCArgo = controle.can(cargo);
            const acoes = metodos[acoa];
            const permicoesTodos = permicoesDoCArgo[acoes.todos](entidade);
            const permicoesApenasSeu = permicoesDoCArgo[acoes.apenasSeu](entidade);

            if (permicoesApenasSeu.granted === false && permicoesTodos.granted === false) {
                return res.status(403).json({ msg: "Acesso negado" });
            } 
            
            req.acesso = {
                todos: {
                    permitido: permicoesTodos.granted,
                    atributos: permicoesTodos.attributes
                },
                apenasSeu: {
                    id,
                    permitido: permicoesApenasSeu.granted,
                    atributos: permicoesApenasSeu.attributes
                }
            }

            return next();
            
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

}

export { gerenciarPermicoes };