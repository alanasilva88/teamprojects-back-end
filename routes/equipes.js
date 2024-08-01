import { Router } from "express";
import { Usuario } from "../models/usuario.js";
import { Equipe } from "../models/equipe.js";
import { Projeto } from "../models/projeto.js";
import { Tarefa } from "../models/tarefa.js";



export const equipesRouter = Router();

equipesRouter.get("/equipes", async(req, res) => {
    const listaEquipes = await Equipe.findAll();
    res.json(listaEquipes);
});

equipesRouter.get("/equipes/:id", async(req, res) => {
    const listaEquipe = await Equipe.findOne({
        where: { id: req.params.id },
        include: [ Usuario, {model: Projeto, include: [Tarefa]} ],
    });
    
    if(listaEquipe) {
        res.json(listaEquipe);
    } else {
        res.status(404).json({message: "Equipe não encontrada!"});
    }
});

