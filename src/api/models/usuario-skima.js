import { Schema, model } from "mongoose";

const usuarioSchema = new Schema(
    {
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        senha: {
            type: String,
            required: true
        },
        emailVerificado: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String,
            default: ""
        },
        validade: {
            type: Number,
            default: 0
        },
        cargo: {
            type: String,
            default: "assinante",
            enum: ["assinante", "admin", "editor"]
        },
        arquivos: [{
            nomeOriginal: {
                type: String,
                required: true
            },
            tamanho: {
                type: Number,
                required: true
            },
            nomeHash: {
                type: String,
                required: true
            },
        }]
    },
    {
        timestamps: true,
        minimize: false
    }
);

const Usuario = model("Usuario", usuarioSchema);

export { Usuario };