import { connection } from "../config/database.js";
import { DataTypes } from "sequelize"; 
import { Usuario } from "./usuario.js";
import { Projeto } from "./projeto.js";


export const Tarefa = connection.define("tarefa", {
    
    titulo: {
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM("Pendente", "Em progresso", "Concluído", "Cancelado"),
        defaultValue: "Pendente",
    },
    data_criacao: {
        type: DataTypes.DATEONLY, 
        allowNull: true 
    },
    data_conclusao: {
        type: DataTypes.DATEONLY, 
        allowNull: true 
    }
},{timestamps: true 
});


Tarefa.belongsTo(Projeto, { onDelete: "CASCADE" });
Projeto.hasMany(Tarefa);

Tarefa.belongsToMany(Usuario, { through: "TarefaUsuario" });
Usuario.belongsToMany(Tarefa, { through: "TarefaUsuario" });
