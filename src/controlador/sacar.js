const { saques } = require("../dados/bancodedados");
const { encontrarContaPeloNumero } = require("../service/encontrarConta");

const tipoSacar = async (req, res) => {
    const { numero_conta, senha, valor } = req.body;

    if (!numero_conta || !senha || !valor) {
        return res.status(400).json({ mensagem: "Obrigatorio preencher todos os campos!" })
    }

    const contaEncontrada = encontrarContaPeloNumero(numero_conta)
    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta não encontrada!" });
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha inválida!" })
    }

    if (contaEncontrada.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente!" })
    }

    const horarioSaque = new Date();

    const comprovanteDeSaque = {
        data: horarioSaque,
        numero_conta,
        valor
    }

    contaEncontrada.saldo -= valor;
    saques.push(comprovanteDeSaque);

    res.status(200).json({ mensagem: "Saque realizado com sucesso!", comprovanteDeSaque });

}

module.exports = tipoSacar;