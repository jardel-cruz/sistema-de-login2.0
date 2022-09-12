import redis from "redis";

const allowListCliente = redis.createClient();

(async function () {
    await allowListCliente.connect();
})();

export { allowListCliente };