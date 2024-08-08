import { Router } from "express";
import { Usuario } from "../models/usuario.js";
import { Equipe } from "../models/equipe.js";
import { Projeto } from "../models/projeto.js";
import { Tarefa } from "../models/tarefa.js";



export const projetosRouter = Router();

projetosRouter.get("/projetos", async(req, res) => {
    const listaProjetos = await Projeto.findAll();
    res.json(listaProjetos);
});


projetosRouter.get("/projetos/:id", async(req, res) => {
    const listaProjetos = await Projeto.findOne({
        where: { id: req.params.id },
        include: [ Equipe, Tarefa, Usuario ]
    });
    
    if(listaProjetos) {
        res.json(listaProjetos);
    } else {
        res.status(404).json({message: "Projeto não encontrado!"});
    }
});



projetosRouter.post("/projetos", async(req, res) => {
    const { nome, descricao, data_inicio, data_final } = req.body;
    
    if (!data_inicio) {
        return res.status(400).json({ message: "O campo 'Data de Início' é obrigatório!" });
    }

    console.log('Dados recebidos:', req.body);
    try {
        await Projeto.create(
            { nome, descricao, data_inicio, data_final: data_final || null }
        );
        res.status(201).json({message: "Projeto criado com sucesso!"});
    }catch(err) {
        res.status(500).json({message: "Um erro ocorreu ao adicionar o projeto!"});
    }
});



projetosRouter.put("/projetos/:id", async(req, res) => {
    const idProjetos = req.params.id;
    const { nome, descricao, data_inicio, data_final } = req.body;

    try {
        const projeto = await Projeto.findOne({ where: { id: idProjetos }});
        if(projeto){
            await projeto.update({ nome, descricao, data_inicio, data_final });
            res.json({message: "Projeto atualizado com sucesso!"})
        } else {
            res.status(404).json({message: "Projeto não encontrado!"});
        }
    }catch(err) {
        res.status(500).json({message: "Ocorreu um erro ao atualizar o projeto!"});
    }
});



projetosRouter.delete("/projetos/:id", async(req, res) => {
    const idProjetos = req.params.id;
    
    try {
        const projeto = await Projeto.findOne({where: {id: idProjetos}});

        if(projeto) {
            await projeto.destroy();
            res.json({message: "Projeto removido com sucesso!"})
            
        } else {
            res.status(404).json({Message: "Projeto não encontrado!"})
        }
    }catch(err) {
        res.status(500).json({message: "Um erro ocorreu ao excluir projeto!"});
    }
});
