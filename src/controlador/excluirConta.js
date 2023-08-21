const { contas } = require("../dados/bancodedados");
const { encontrarContaPeloNumero } = require("../service/encontrarConta");

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const contaEncontrada = encontrarContaPeloNumero(numeroConta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta não encontrada!" })
    };

    if (contaEncontrada.saldo !== 0) {
        return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })
    };

    const posicaoDaConta = contas.indexOf(contaEncontrada);
    contas.splice(posicaoDaConta, 1);
    return res.status(200).json({ mensagem: "Conta excluída com sucesso!" });
};

module.exports = excluirConta;