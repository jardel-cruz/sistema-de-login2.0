import redis from "redis";

const blockListCliente = redis.createClient();

(async function () {
    await blockListCliente.connect();
})();

export { blockListCliente };