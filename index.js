import { connection, authenticate } from "./config/database.js";
import express from "express";
import { usuariosRouter } from "./routes/usuarios.js";
import { equipesRouter } from "./routes/equipes.js";




authenticate(connection).then(() => {
   connection.sync(); 
   
  
});


const app = express();


app.use(express.json()); 

app.use(usuariosRouter);
app.use(equipesRouter);



app.listen(4000, () => {
    console.log("Servidor rodando em http://localhost:4000/");
  });