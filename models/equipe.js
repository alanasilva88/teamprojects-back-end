import { connection } from "../config/database.js";
import { DataTypes } from "sequelize"; 
import { Usuario } from "./usuario.js";


export const Equipe = connection.define("equipe", {
    
    nome: {
        type: DataTypes.STRING(130), 
        allowNull: false 
    },
    descricao: {
        type: DataTypes.TEXT
    }
});

Equipe.belongsToMany(Usuario, { through: "EquipeUsuario" });
Usuario.belongsToMany(Equipe, { through: "EquipeUsuario" });

Equipe.hasMany(Projeto, { onDelete: "CASCADE" });
Projeto.belongsTo(Equipe);
