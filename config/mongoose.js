import { config } from "dotenv";
import mongoose from "mongoose";

config(); // Carrega variáveis do .env

// Conexão com o MongoDB
export async function connectMongo() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conexão com MongoDB Atlas foi bem-sucedida!");
    } catch (err) {
        console.error("Erro ao conectar com MongoDB Atlas:", err);
    }
}
