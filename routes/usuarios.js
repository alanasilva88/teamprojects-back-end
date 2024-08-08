import { Router } from "express";
import { Usuario } from "../models/usuario.js";
import { Equipe } from "../models/equipe.js";
import { Projeto } from "../models/projeto.js";
import { Tarefa } from "../models/tarefa.js";

export const usuariosRouter = Router();

usuariosRouter.get("/usuarios", async(req, res) => {
    const listaUsuarios = await Usuario.findAll();
    res.json(listaUsuarios);
});

usuariosRouter.get("/usuario/:id", async(req, res) => {
    const listaUsuario = await Usuario.findOne({
        where: { id: req.params.id },
        include: [ Equipe, Projeto, Tarefa]
    });
    
    if(listaUsuario) {
        res.json(listaUsuario);
    } else {
        res.status(404).json({message: "Usuário não encontrado!"});
    }
});

usuariosRouter.post("/usuario", async(req, res) => {
    const { nome, email } = req.body;

    try {
        await Usuario.create(
            { nome, email }
        );
        res.status(201).json({message: "Usuário criado com sucesso!"});
    }catch(err) {
        res.status(500).json({message: "Um erro ocorreu ao adicionar o usuário!"});
    }
});


usuariosRouter.put("/usuario/:id", async(req, res) => {
    const idUsuario = req.params.id;
    const { nome, email } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { id: idUsuario }});
        if(usuario){
            await usuario.update({ nome, email });
            res.json({message: "Usuário atualizado com sucesso!"})
        } else {
            res.status(404).json({message: "Usuário não encontrado!"});
        }
    }catch(err) {
        res.status(500).json({message: "Ocorreu um erro ao atualizar o usuário!"});
    }
});


usuariosRouter.delete("/usuario/:id", async(req, res) => {
    const idUsuario = req.params.id;
    
    try {
        const usuario = await Usuario.findOne({where: {id: idUsuario}});

        if(usuario) {
            await usuario.destroy();
            res.json({message: "Usuário removido com sucesso!"})
            
        } else {
            res.status(404).json({Message: "Usuário não encontrado!"})
        }
    }catch(err) {
        res.status(500).json({message: "Um erro ocorreu ao excluir usuário!"});
    }
});
