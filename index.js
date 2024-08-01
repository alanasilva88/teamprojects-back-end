import { connection, authenticate } from "./config/database.js";



authenticate(connection).then(() => {
    connection.sync();

});

const app = express();


app.use(express.json()); 






app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
  });