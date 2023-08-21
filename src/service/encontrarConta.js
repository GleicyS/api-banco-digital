const { contas } = require("../dados/bancodedados");

const encontrarContaPeloNumero = (numero_conta) => {
    const contaEncontrada = contas.find((conta) => conta.numero === Number(numero_conta));
    return contaEncontrada;
}


module.exports = { encontrarContaPeloNumero };