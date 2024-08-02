import { Router } from "express";
import { Tarefa } from "../models/tarefa.js";
import { Usuario } from "../models/usuario.js";
import { Projeto } from "../models/projeto.js";



export const tarefasRouter = Router();


tarefasRouter.get("/tarefas", async(req, res) => {
    const listaTarefas = await Tarefa.findAll();
    res.json(listaTarefas);
});


tarefasRouter.get("/tarefas/:id", async(req, res) => {
    const listaTarefas = await Tarefa.findOne({
        where: { id: req.params.id },
        include: [ Projeto, Usuario ]
    });
    
    if(listaTarefas) {
        res.json(listaTarefas);
    } else {
        res.status(404).json({message: "Tarefas não encontrada!"});
    }
});


tarefasRouter.post("/tarefas", async(req, res) => {
    const { titulo, descricao, status, data_criacao, data_conclusao } = req.body;

    try {
        await Tarefa.create(
            { titulo, descricao, status, data_criacao, data_conclusao }
        );
        res.status(201).json({message: "Tarefa criada com sucesso!"});
    }catch(err) {
        res.status(500).json({message: "Um erro ocorreu ao adicionar tarefa!"});
    }
});


tarefasRouter.put("/tarefas/:id", async(req, res) => {
    const idTarefas = req.params.id;
    const { titulo, descricao, status, data_criacao, data_conclusao } = req.body;

    try {
        const tarefa = await Tarefa.findOne({ where: { id: idTarefas }});
        if(tarefa){
            await tarefa.update({ titulo, descricao, status, data_criacao, data_conclusao });
            res.json({message: "Tarefa atualizada com sucesso!"})
        } else {
            res.status(404).json({message: "Tarefa não encontrada!"});
        }
    }catch(err) {
        res.status(500).json({message: "Ocorreu um erro ao atualizar tarefa!"});
    }
});


tarefasRouter.delete("/tarefas/:id", async(req, res) => {
    const idTarefas = req.params.id;
    
    try {
        const tarefa = await Tarefa.findOne({where: {id: idTarefas}});

        if(tarefa) {
            await tarefa.destroy();
            res.json({message: "Tarefa removida com sucesso!"})
            
        } else {
            res.status(404).json({Message: "Tarefa não encontrada!"})
        }
    }catch(err) {
        res.status(500).json({message: "Um erro ocorreu ao excluir tarefa!"});
    }
});

