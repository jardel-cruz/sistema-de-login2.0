import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        titulo: {
            type: String,
            required: true,
        },
        conteudo: {
            type: String,
            required: true,
        },
        altor: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Post = model("Post", postSchema);

export { Post };