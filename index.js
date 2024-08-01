import { connection, authenticate } from "./config/database.js";
import { json } from "sequelize";
import { Equipe } from "./models/equipe.js";
import { Projeto } from "./models/projeto.js";
import { Tarefa } from "./models/tarefa.js";
import { Usuario } from "./models/usuario.js";
import express from "express";

authenticate(connection).then(() => {
  connection.sync();
});

const app = express();

app.use(express.json());

app.get("/hello", (requisicao, resposta) => {
  resposta.send("Hello World!");
});

app.listen(4000, () => {
  console.log("Servidor rodando em http://localhost:4000/");
});
