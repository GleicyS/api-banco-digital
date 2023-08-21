const { encontrarContaPeloNumero } = require("../service/encontrarConta");

const verificarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "Obrigatório preencher número da conta e senha." })
    };

    const contaEncontrada = encontrarContaPeloNumero(numero_conta);
    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta não encontrada!" })
    };

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha inválida!" })
    };

    res.status(200).json({ saldo: contaEncontrada.saldo });
};


module.exports = verificarSaldo;