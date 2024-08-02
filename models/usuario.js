import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Usuario = connection.define("usuario", {
  nome: {
    type: DataTypes.STRING(130),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true 
});