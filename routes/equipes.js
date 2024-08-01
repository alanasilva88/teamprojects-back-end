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

equipesRouter.post("/equipes", async(req, res) => {
    const { nome, descricao } = req.body;

    try {
        await Equipe.create(
            { nome, descricao }
        );
        res.status(201).json({message: "Equipe criada com sucesso!"});
    }catch(err) {
        res.status(500).json({message: "Um erro ocorreu ao adicionar equipe!"});
    }
});


equipesRouter.put("/equipes/:id", async(req, res) => {
    const idEquipe = req.params.id;
    const { nome, descricao } = req.body;

    try {
        const equipe = await Equipe.findOne({ where: { id: idEquipe }});
        if(equipe){
            await equipe.update({ nome, descricao });
            res.json({message: "Equipe atualizada com sucesso!"})
        } else {
            res.status(404).json({message: "Equipe não encontrada!"});
        }
    }catch(err) {
        res.status(500).json({message: "Ocorreu um erro ao atualizar!"});
    }
});


equipesRouter.delete("/equipes/:id", async(req, res) => {
    const idEquipe = req.params.id;
    
    try {
        const equipe = await Equipe.findOne({where: {id: idEquipe}});

        if(equipe) {
            await equipe.destroy();
            res.json({message: "Equipe removida com sucesso!"})
            
        } else {
            res.status(404).json({Message: "Equipe não encontrada!"})
        }
    }catch(err) {
        res.status(500).json({message: "Um erro ocorreu ao excluir!"});
    }
});
