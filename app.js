const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

// 1. Instalação e Configuração do Express.js
app.get('/', (req, res) => {
    res.send(`Bem vindo!`)
})


// 2. Rotas Dinâmicas
app.get('/bemvindo/:nome', (req, res) => {
    const { nome } = req.params
    res.send(`Bem vindo ${nome}!`)
})

// 3. Middleware de Autenticação Fake
const SecurityMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        console.log('Token válido:', token);
        next();
    } else {
        res.status(401).json({ message: 'Não Autorizado: token de autenticação não fornecido.' });
    }
};
app.get('/rota-protegida', SecurityMiddleware, (req, res) => {

    res.send(`Aqui estão seus dados importantes: cpf:11111111111, email:...!`)
});

const produtos = [
    { id: 1, nome: 'Camiseta', categoria: 'roupa', preco: 29.99 },
    { id: 2, nome: 'Notebook', categoria: 'eletronico', preco: 1999.99 },
    { id: 3, nome: 'Tênis', categoria: 'calçado', preco: 99.99 },
    { id: 4, nome: 'Fone de Ouvido', categoria: 'eletronico', preco: 199.99 },
    { id: 5, nome: 'Calça', categoria: 'roupa', preco: 59.99 }
];

// 4. Manipulação de Dados com Query Params
app.get('/produtos', (req, res) => {
    const { categoria } = req.query;

    let produtosFiltrados = produtos;

    if (categoria) {
        produtosFiltrados = produtosFiltrados.filter(produto => produto.categoria === categoria);
    }

    res.json(produtosFiltrados);
});

const validarProduto = (req, res, next) => {
    const { nome, categoria, preco } = req.body;
  
    if (!nome || !categoria || preco === undefined) {
      return res.status(400).json({ error: 'Nome, categoria e preço são obrigatórios.' });
    }
  
    if (typeof preco !== 'number' || preco <= 0) {
      return res.status(400).json({ error: 'Preço deve ser um número positivo.' });
    }
  
    next();
  };

// 5. Receber Dados com POST
// 6. Validação de Dados com Middleware
app.post('/produtos', validarProduto, (req, res) => {
    const produto = req.body;

    const novoProduto = {
        id: crypto.randomUUID(),
        ...produto
    };

    res.json(novoProduto);
});
// 7. Gerenciamento de Erros Globais
app.get('/testar-erro', (req, res, next) => {
    throw new Error('Erro de teste');
  });   

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'Algo deu errado!',
      error: err.message 
    });
  });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
