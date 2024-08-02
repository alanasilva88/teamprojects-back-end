import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Usuario } from "./usuario.js";

export const Projeto = connection.define(
  "projeto",
  {
    nome: {
      type: DataTypes.STRING(130),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    data_final: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  { timestamps: true }
);

Projeto.belongsTo(Usuario, { onDelete: "CASCADE" });
Usuario.hasMany(Projeto);
