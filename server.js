import { app } from "./src/app.js";
import { servidorEnv } from "./src/configs/envs.js";

app.listen(servidorEnv.porta, console.log(`Servidor acessível em http://${servidorEnv.host}`));