import { connection, authenticate } from "./config/database.js";
import express from "express";
import { json } from "sequelize";



authenticate(connection).then(() => {
    connection.sync();

});

const app = express();


app.use(express.json()); 

app.get("/hello", (requisicao, resposta) => { 
    resposta.send("Hello World!"); 
});







app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
  });