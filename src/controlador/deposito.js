const { depositos } = require('../dados/bancodedados');
const { encontrarContaPeloNumero } = require("../service/encontrarConta");


const tipoDeposito = (req, res) => {
    const { numero_conta, valor } = req.body;

    const contaEncontrada = encontrarContaPeloNumero(numero_conta);
    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta não encontrada!" });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "Valor do deposito tem que ser acima de zero." });
    }

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: "Número da conta e valor do deposito são obrigatórios!" });
    }

    const horarioDeposito = new Date();

    const comprovanteDeDeposito = {
        data: horarioDeposito,
        numero_conta,
        valor
    }

    contaEncontrada.saldo += valor;
    depositos.push(comprovanteDeDeposito);

    res.status(200).json({ mensagem: "Depósito realizado com sucesso!", comprovanteDeDeposito });
}

module.exports = tipoDeposito;