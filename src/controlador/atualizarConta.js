const { contas } = require("../dados/bancodedados");
const { encontrarContaPeloNumero } = require("../service/encontrarConta");


const atualizarUsuarioConta = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, data_nascimento, telefone, senha, cpf, email } = req.body;


    if (!nome || !cpf || !data_nascimento || !telefone || !senha) {
        return res.status(400).json({ mensagem: "Obrigatório preencher todos os campos." });
    }

    const contaEncontrada = encontrarContaPeloNumero(numeroConta);
    if (!contaEncontrada) {
        return res.status(400).json({ mensagem: "Conta não encontrada!" });
    };


    const cpfExiste = contas.some((conta) => conta.usuario.cpf === cpf && conta.numero !== Number(numeroConta));
    const emailExiste = contas.some((conta) => conta.usuario.email === email && conta.numero !== Number(numeroConta));

    if (cpfExiste) {
        return res.status(400).json({ mensagem: "O CPF informado já existe cadastrado!" })
    }
    if (emailExiste) {
        return res.status(400).json({ mensagem: "O email informado já existe cadastrado!" })
    }

    if (nome !== undefined) {
        contaEncontrada.usuario.nome = nome;
    }
    if (cpf !== undefined) {
        contaEncontrada.usuario.cpf = cpf;
    }
    if (email !== undefined) {
        contaEncontrada.usuario.email = email;
    }
    if (data_nascimento !== undefined) {
        contaEncontrada.usuario.data_nascimento = data_nascimento;
    }
    if (telefone !== undefined) {
        contaEncontrada.usuario.telefone = telefone;
    }
    if (senha !== undefined) {
        contaEncontrada.usuario.senha = senha;
    }

    return res.json({ mensagem: "Atualização realizada!" });
};


module.exports = atualizarUsuarioConta;