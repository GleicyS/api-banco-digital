const { depositos, saques, transferencias } = require("../dados/bancodedados");
const { encontrarContaPeloNumero } = require("../service/encontrarConta");

const verificarExtrato = (req, res) => {
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

    const depositosUsuario = depositos.filter((deposito) => deposito.numero_conta === Number(numero_conta))

    const saqueUsuario = saques.filter((saque) => saque.numero_conta === Number(numero_conta))

    const transferenciasEnviadas = transferencias.filter((transferencia) => transferencia.numero_conta_origem === Number(numero_conta))

    const transferenciasRecebidas = transferencias.filter((transferencia) => transferencia.numero_conta_destino === Number(numero_conta))


    return res.json({ Depositos: depositosUsuario, Saques: saqueUsuario, transferenciasEnviadas, transferenciasRecebidas })

};

module.exports = verificarExtrato;