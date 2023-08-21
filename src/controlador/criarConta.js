const { contas } = require("../dados/bancodedados");


const validarDadosCliente = (cliente) => {
    if (!cliente.nome?.trim()) {
        return "Nome obrigatório!"
    }
    if (!cliente.cpf?.trim()) {
        return "CPF obrigatório!"
    }
    if (!cliente.email?.trim()) {
        return "Email obrigatório!"
    }
    if (!cliente.data_nascimento?.trim()) {
        return "Data de nascimento obrigatório!"
    }
    if (!cliente.telefone?.trim()) {
        return "Telefone obrigatório!"
    }
    if (!cliente.senha?.trim()) {
        return "Senha obrigatório!"
    }
};

let numeroConta = 1;
const criarConta = (req, res) => {
    const { nome, cpf, email, data_nascimento, telefone, senha } = req.body;

    const erro = validarDadosCliente(req.body);
    if (erro) {
        return res.status(400).json({ mensagem: erro })
    };

    const cpfOuEmailExiste = contas.some((conta) => conta.usuario.cpf === cpf || conta.usuario.email === email);

    if (cpfOuEmailExiste) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!." })
    }

    const novaConta = {
        numero: numeroConta,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            email,
            telefone,
            senha
        }
    };

    contas.push(novaConta);
    numeroConta++;
    res.status(200).json(novaConta);
};


module.exports = criarConta;