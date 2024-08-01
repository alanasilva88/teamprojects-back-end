import { connection } from "../config/database.js";
import { DataTypes } from "sequelize"; 


export const Usuario = connection.define("usuario", {
    
    nome: {
        type: DataTypes.STRING(130), 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
<<<<<<< HEAD
    }
});
=======
    }
});
>>>>>>> e31fefc665b57bf40e2fe997b507943382a923a3
