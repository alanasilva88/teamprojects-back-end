import { connection, authenticate } from "./config/database.js";
import express from "express";
import { usuariosRouter } from "./routes/usuarios.js";
import { equipesRouter } from "./routes/equipes.js";
import { tarefasRouter } from "./routes/tarefas.js";
import { projetosRouter } from "./routes/projetos.js";
import { loginRouter } from "./routes/login.js";
import { connectMongo } from "./config/mongoose.js"; // Importa a função de conexão com MongoDB
import { registerRouter } from "./routes/register.js";

// Conectando ao MongoDB
connectMongo()
  .then(() => {
    // Conectar ao MySQL
    authenticate(connection)
      .then(() => {
        // Sincronizar o banco de dados MySQL
        connection.sync();

        // Inicializar o servidor
        const app = express();

        app.use(express.json());

        app.use(usuariosRouter);
        app.use(equipesRouter);
        app.use(tarefasRouter);
        app.use(projetosRouter);
        app.use(loginRouter);
        app.use(registerRouter);

        app.listen(4000, () => {
          console.log("Servidor rodando em http://localhost:4000/");
        });
      })
      .catch((error) => {
        console.error("Erro ao conectar com MySQL:", error);
      });
  })
  .catch((error) => {
    console.error("Erro ao conectar com MongoDB Atlas:", error);
  });
