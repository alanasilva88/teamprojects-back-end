import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Usuario } from "./usuario.js";
import { Projeto } from "./projeto.js";

export const Equipe = connection.define(
  "equipe",
  {
    nome: {
      type: DataTypes.STRING(130),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: true }
);

Equipe.belongsToMany(Usuario, { through: "EquipeUsuario" });
Usuario.belongsToMany(Equipe, { through: "EquipeUsuario" });

Equipe.hasMany(Projeto, { onDelete: "CASCADE" });
Projeto.belongsTo(Equipe);
