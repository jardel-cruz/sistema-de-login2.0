import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";

import { db } from "./configs/mongodeConfig.js";
import { allowListCliente } from "./configs/allow-list-config.js";
import { blockListCliente } from "./configs/block-list-config.js";
import { router } from "./routes/index.js";
import { passport } from "./security/strategy-passport.js";

blockListCliente.on("connect", () => console.log("Cliente Redis block-list está conectado."));
blockListCliente.on("error", (e) => console.log("Cliente Redis block-list não pode se conectar.", e));

allowListCliente.on("connect", () => console.log("Cliente Redis allow-list está conectado."));
allowListCliente.on("error", (e) => console.log("Cliente Redis allow-list não pode se conectar.", e));

db.once("error", console.log.bind(console, "Erro de conexão com o mongoDb"));
db.on("open", () => console.log("Conectado com o MongoDb"));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

router(app)

app.use(async (req, res) => {
    return res.status(404).json({ msg: "Essa rota não existe" });
});

export { app };