import { Router } from "express";
import { Usuario } from "../models/usuario.js";
import { Equipe } from "../models/equipe.js";
import { Projeto } from "../models/projeto.js";
import { Tarefa } from "../models/tarefa.js";

export const equipesRouter = Router();

// Recupera todas as equipes, incluindo usuários
equipesRouter.get("/equipes", async (req, res) => {
    try {
        const listaEquipes = await Equipe.findAll({ include: [Usuario] });
        res.json(listaEquipes);
    } catch (err) {
        console.error("Erro ao carregar equipes", err);
        res.status(500).json({ message: "Erro ao carregar equipes" });
    }
});

// Recupera uma equipe pelo ID, incluindo usuários, projetos e tarefas
equipesRouter.get("/equipes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const listaEquipe = await Equipe.findOne({
            where: { id },
            include: [Usuario, { model: Projeto, include: [Tarefa] }]
        });
        
        if (listaEquipe) {
            res.json(listaEquipe);
        } else {
            res.status(404).json({ message: "Equipe não encontrada!" });
        }
    } catch (err) {
        console.error("Erro ao carregar equipe", err);
        res.status(500).json({ message: "Erro ao carregar equipe" });
    }
});

// Cria uma nova equipe e associa usuários a ela
equipesRouter.post("/equipes", async (req, res) => {
    const { nome, descricao, usuarios } = req.body;

    try {
        // Cria a equipe
        const equipe = await Equipe.create({ nome, descricao });

        // Associa os usuários à equipe
        if (usuarios && usuarios.length > 0) {
            await equipe.setUsuarios(usuarios); // 'usuarios' deve ser um array de IDs
        }

        res.status(201).json(equipe);
    } catch (err) {
        console.error("Erro ao criar equipe", err);
        res.status(500).json({ message: "Erro ao criar equipe" });
    }
});

// Atualiza uma equipe existente e atualiza a associação com os usuários
equipesRouter.put("/equipes/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, usuarios } = req.body;

    try {
        const equipe = await Equipe.findOne({ where: { id } });
        if (equipe) {
            await equipe.update({ nome, descricao });

            // Atualiza a associação com os usuários
            if (usuarios && usuarios.length > 0) {
                await equipe.setUsuarios(usuarios);
            }

            res.json({ message: "Equipe atualizada com sucesso!" });
        } else {
            res.status(404).json({ message: "Equipe não encontrada!" });
        }
    } catch (err) {
        console.error("Erro ao atualizar equipe", err);
        res.status(500).json({ message: "Erro ao atualizar equipe" });
    }
});

// Remove uma equipe
equipesRouter.delete("/equipes/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const equipe = await Equipe.findOne({ where: { id } });
        if (equipe) {
            await equipe.destroy();
            res.json({ message: "Equipe removida com sucesso!" });
        } else {
            res.status(404).json({ message: "Equipe não encontrada!" });
        }
    } catch (err) {
        console.error("Erro ao excluir equipe", err);
        res.status(500).json({ message: "Erro ao excluir equipe" });
    }
});
