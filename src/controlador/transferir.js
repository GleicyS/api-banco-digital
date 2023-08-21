const { transferencias } = require("../dados/bancodedados");
const { encontrarContaPeloNumero } = require("../service/encontrarConta");


const tipoTransferencia = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, senha, valor } = req.body;


    if (!numero_conta_origem || !numero_conta_destino || !senha || !valor) {
        return res.status(400).json({ mensagem: "Obrigatorio preencher todos os campos!" })
    };

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "Valor da transferência tem que ser acima de zero!" })
    };

    const contaEncontrada = encontrarContaPeloNumero(numero_conta_origem);
    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta não encontrada!" })
    };

    const contaDestinoEncontrada = encontrarContaPeloNumero(numero_conta_destino);
    if (!contaDestinoEncontrada) {
        return res.status(404).json({ mensagem: "Conta de destino não encontrada!" })
    };

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha inválida!" })
    };

    if (contaEncontrada.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente!" })
    };

    const horarioTransferencia = new Date();

    const comprovanteDeTransferencia = {
        data: horarioTransferencia,
        numero_conta_origem,
        numero_conta_destino,
        valor
    };

    contaEncontrada.saldo -= valor;
    contaDestinoEncontrada.saldo += valor;

    transferencias.push(comprovanteDeTransferencia);
    res.status(200).json({ mensagem: "Transferencia realizada com sucesso!", comprovanteDeTransferencia });

};

module.exports = tipoTransferencia;