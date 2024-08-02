import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const loginRouter = Router();

// Open Route - Public Route
loginRouter.get("/", (req, resp) => {
  resp.status(200).json({ message: "Bem vindo a nossa API" });
});

// Private Route
loginRouter.get("/user/:id", checkToken, async (req, resp) => {
  const id = req.params.id;

  // Verifica se o ID é válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resp.status(400).json({ msg: "ID inválido!" });
  }

  // Checa se o usuário existe
  const user = await User.findById(id, "-password");

  if (!user) {
    return resp.status(404).json({ msg: "Usuário não encontrado!" });
  }

  resp.status(200).json(user);
});

function checkToken(req, resp, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return resp.status(401).json({ msg: "Acesso negado!" });
  }
  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (err) {
    resp.status(400).json({ msg: "Token Invalido" });
  }
}

// Login
loginRouter.post("/auth/login", async (req, resp) => {
  const { email, password } = req.body;

  // Validações
  if (!email) {
    return resp.status(422).json({ msg: "O email é obrigatório! " });
  }

  if (!password) {
    return resp.status(422).json({ msg: "A senha é obrigatório! " });
  }

  //Checar se o usuario existe
  const user = await User.findOne({ email: email });

  if (!user) {
    return resp.status(404).json({ msg: "Usuario não encontrado!" });
  }

  // Checar se a senha esta correta
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return resp.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );
    resp.status(200).json({ msg: "Usuario logado com sucesso!", token });
  } catch (err) {
    return resp.status(500).json({
      msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    });
  }
});
