const express = require("express");

const acessoPrivado = require("./intermediario");
const listarContas = require("./controlador/listarContas");
const criarConta = require("./controlador/criarConta");
const atualizarUsuarioConta = require("./controlador/atualizarConta");
const excluirConta = require("./controlador/excluirConta");
const tipoDeposito = require("./controlador/deposito");
const tipoSacar = require("./controlador/sacar");
const tipoTransferencia = require("./controlador/transferir");
const verificarSaldo = require("./controlador/saldo");
const verificarExtrato = require("./controlador/extrato");


const rotas = express();


rotas.get("/contas", acessoPrivado, listarContas);
rotas.post("/contas", criarConta);
rotas.put("/contas/:numeroConta/usuario", atualizarUsuarioConta);
rotas.delete("/contas/:numeroConta", excluirConta);
rotas.get("/contas/saldo", verificarSaldo);
rotas.get("/contas/extrato", verificarExtrato);

rotas.post("/transacoes/depositar", tipoDeposito);
rotas.post("/transacoes/sacar", tipoSacar);
rotas.post("/transacoes/transferir", tipoTransferencia);


module.exports = rotas;