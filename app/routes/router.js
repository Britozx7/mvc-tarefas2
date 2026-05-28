var express = require("express");
var router = express.Router();
const tarefasController = require("../controllers/tarefasController");

// Rota para listar todas as tarefas (GET /)
router.get("/", tarefasController.listaTarefas);

// Rota para exibir formulário de nova tarefa (GET /nova-tarefa)
router.get("/nova-tarefa", tarefasController.novaForm);

// Rota para exibir formulário de edição (GET /editar?id=...)
router.get("/editar", tarefasController.editarForm);

// Rota para salvar/atualizar tarefa (POST /manter-tarefa)
router.post("/manter-tarefa", tarefasController.manter);

// Rota para deletar tarefa logicamente (GET /deletar-logico?id=...)
router.get("/deletar-logico", tarefasController.deletarLogico);

module.exports = router;


router.get("/editar", async (req, res) => {
    res.locals.moment = moment;
    //recuperando a querystring
    const id = req.query.id;
    try {
        const result = await tarefasModel.findById(id);
        res.render("pages/cadastro",
            {
                tituloPagina: "Alterar Tarefa", tituloAba: "Edição de Tarefa",
                tarefa: result[0]
            });
    } catch (erro) {
        console.log(erro)
    }

});


router.get("/teste-insert", async (req, res) => {

    const objDados = {
        nome: "limpar gabinete PC",
        prazo: "2026-03-23"
    }
    try {
        const result = await tarefasModel.create(objDados);
        res.send(result);
    } catch (erro) {
        console.log(erro);
    }
});

//exclusão física - hard delete
router.get("/deletar-fisico", async (req, res) => {
    const id = req.query.id;
    try {
        const result = await tarefasModel.deleteFisic(id);
        res.redirect("/");
    } catch (erro) {
        console.log(erro);
    }
});

//exclusão lógica - soft delete
router.get("/deletar-logico", async (req, res) => {
    const id = req.query.id;
    try {
        const result = await tarefasModel.deleteLogic(id);
        res.redirect("/");
    } catch (erro) {
        console.log(erro);
    }
});





module.exports = router;