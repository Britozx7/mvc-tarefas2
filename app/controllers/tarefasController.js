const { tarefasModel } = require("../models/tarefasModel");
const moment = require("moment");
moment.locale('pt-br');

const tarefasController = {
    
    // Listar todas as tarefas
    listaTarefas: async (req, res) => {
        res.locals.moment = moment;
        try {
            const result = await tarefasModel.findAll();
            res.render("pages/index", { listaTarefas: result });
        } catch (erro) {
            console.log("Erro ao listar tarefas:", erro);
            res.status(500).send("Erro ao listar tarefas");
        }
    },

    // Exibir formulário para nova tarefa
    novaForm: (req, res) => {
        res.locals.moment = moment;
        res.render("pages/cadastro", {
            tituloPagina: "Cadastro de Tarefas",
            tituloAba: "Cadastro",
            tarefa: {
                id_tarefa: 0,
                nome_tarefa: "",
                prazo_tarefa: new Date(),
                situacao_tarefa: 1
            }
        });
    },

    // Exibir formulário para editar tarefa
    editarForm: async (req, res) => {
        res.locals.moment = moment;
        const id = req.query.id;

        if (!id) {
            return res.status(400).send("ID da tarefa não fornecido");
        }

        try {
            const result = await tarefasModel.findById(id);
            
            if (!result || result.length === 0) {
                return res.status(404).send("Tarefa não encontrada");
            }

            res.render("pages/cadastro", {
                tituloPagina: "Editar Tarefa",
                tituloAba: "Editar",
                tarefa: result[0]
            });
        } catch (erro) {
            console.log("Erro ao buscar tarefa:", erro);
            res.status(500).send("Erro ao buscar tarefa");
        }
    },

    // Manter tarefa (criar ou atualizar)
    manter: async (req, res) => {
        const objDados = {
            id: req.body.id,
            nome: req.body.nome,
            prazo: req.body.prazo,
            situacao: req.body.situacao
        };

        try {
            if (objDados.id == 0) {
                // Criar nova tarefa
                const result = await tarefasModel.create(objDados);
                console.log("Tarefa criada com sucesso:", result);
            } else {
                // Atualizar tarefa existente
                const result = await tarefasModel.update(objDados);
                console.log("Tarefa atualizada com sucesso:", result);
            }

            res.redirect("/");
        } catch (erro) {
            console.log("Erro ao manter tarefa:", erro);
            res.status(500).send("Erro ao salvar tarefa");
        }
    },

    // Deletar tarefa logicamente (marcar como inativa)
    deletarLogico: async (req, res) => {
        const id = req.query.id;

        if (!id) {
            return res.status(400).send("ID da tarefa não fornecido");
        }

        try {
            const result = await tarefasModel.deleteLogic(id);
            console.log("Tarefa deletada logicamente:", result);
            res.redirect("/");
        } catch (erro) {
            console.log("Erro ao deletar tarefa:", erro);
            res.status(500).send("Erro ao deletar tarefa");
        }
    }
};

module.exports = tarefasController;
