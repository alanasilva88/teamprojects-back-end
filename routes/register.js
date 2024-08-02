import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const registerRouter = Router();

// Registro de Usuario
registerRouter.post("/auth/register", async (req, resp) => {
  const { name, email, password, confirmpassword } = req.body;
  // Validações
  if (!name) {
    return resp.status(422).json({ msg: "O nome é obrigatório! " });
  }

  if (!email) {
    return resp.status(422).json({ msg: "O email é obrigatório! " });
  }

  if (!password) {
    return resp.status(422).json({ msg: "A senha é obrigatório! " });
  }

  if (password !== confirmpassword) {
    return resp.status(422).json({ msg: "As senhas não conferem! " });
  }

  // Verifica se o usuario existe
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return resp.status(422).json({ msg: "Por favor utilize outro email! " });
  }

  // Criar Senha
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // Criar o usuario
  const user = new User({
    name,
    email,
    password: passwordHash,
  });
  try {
    await user.save();
    resp.status(201).json({ msg: "Usuário Criado com sucesso!" });
  } catch (err) {
    resp.status(500).json({ msg: "Ocorreu um erro no servidor" });
  }
});
