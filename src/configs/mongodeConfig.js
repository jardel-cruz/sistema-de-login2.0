import mongoose from "mongoose";
import { dbEnv } from "./envs.js";

const {senha, usuario} = dbEnv;

mongoose.connect(`mongodb+srv://${usuario}:${senha}@cluster0.deg56.mongodb.net/api-arquivos`);

const db = mongoose.connection;

export { db };