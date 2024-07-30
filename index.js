import { connection, authenticate } from "./config/database.js";



authenticate(connection).then(() => {
    connection.sync();

});