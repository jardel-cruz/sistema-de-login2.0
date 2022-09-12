import { allowListCliente } from "../../configs/allow-list-config.js";
import { blockListCliente } from "../../configs/block-list-config.js";

function repositorRedis (cliente) {
    return {
        async salvarEmMemoria (key, valor, validade) {
            await cliente.set(key, valor);
            if (validade) await cliente.expireAt(key, validade);
        },

        async buscarDaMemoria (key) {
            const resultado = cliente.get(key);

            return resultado;
        },

        async conferirValorNaMemoria (key) {
            const resultado = cliente.exists(key);

            return !!resultado;
        },

        async deletarDaMemoria (key) {
            await cliente.del(key);
        }
    }
}

const allowRepositorio = repositorRedis(allowListCliente);
const blockRepositorio = repositorRedis(blockListCliente);

export { allowRepositorio, blockRepositorio };