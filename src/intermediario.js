const { banco } = require("./dados/bancodedados");

const acessoPrivado = (req, res, next) => {

    if (req.query.senha_banco === banco.senha) {
        next();
    } else {
        res.status(401).json({ mensagem: "A senha do banco informada é invalida!" });
    }
};

module.exports = acessoPrivado;