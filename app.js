// Importar Express e dados dos usuários
const express = require("express");
const { usuarios, gerarNovoId } = require("./dados/usuarios");

// Criando a aplicação Express
const app = express();
const PORT = 3000;

app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Servir arquivos estáticos
app.use(express.static("."));

// Log middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleString()}`);
  next();
});

// Verificar se os dados foram importados corretamente
console.log("Dados importados:", { usuarios, gerarNovoId });

// Rota de Teste
app.get("/", (req, res) => {
  res.json({
    mensagem: "Minha primeira API está rodando!",
    versao: "1.0.0",
    autor: "Derick Rufino",
  });
});

// TODAS AS ROTAS DEVEM VIR ANTES DO app.listen()
// Get /usuarios - lista os usuários
app.get("/usuarios", (req, res) => {
  // Verificação de segurança adicionada por Copilot
  if (!usuarios) {
    return res.status(500).json({
      erro: "Dados de usuários não disponíveis",
    });
  }
  res.json({
    total: usuarios.length,
    usuarios: usuarios,
  });
});

// GET /usuarios/:id - Busca um usuário pelo ID
app.get("/usuarios/:id", (req, res) => {
  // Pega o ID da URL
  const id = parseInt(req.params.id);

  // Procura o usuário pelo ID
  const usuario = usuarios.find((user) => user.id === id);

  // Se não encontrar, retorna erro 404
  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado",
      id: id,
    });
  }

  // Se encontrar, retorna o usuário
  res.json(usuario);
});

// POST /usuarios - Cria um novo usuário
app.post("/usuarios", (req, res) => {
  // Pega os dados do corpo da requisição
  const { nome, email, idade } = req.body;

  // Validação simples
  if (!nome || !email) {
    return res.status(400).json({
      erro: "Nome e email são obrigatórios",
    });
  }

  // Verifica se email já existe
  const emailExiste = usuarios.find((user) => user.email === email);
  if (emailExiste) {
    return res.status(400).json({
      erro: "Email já está em uso",
    });
  }

  // Cria o novo usuário
  const novoUsuario = {
    id: gerarNovoId(),
    nome: nome,
    email: email,
    idade: idade || 18, // Se não informar idade, usa 18
    ativo: true,
  };

  // Adiciona ao array
  usuarios.push(novoUsuario);

  // Retorna o usuário criado
  res.status(201).json({
    mensagem: "Usuário criado com sucesso!",
    usuario: novoUsuario,
  });
});

// DELETE /usuarios/:id - Remove um usuário
app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Procura o índice do usuário
  const indice = usuarios.findIndex((user) => user.id === id);

  if (indice === -1) {
    return res.status(404).json({
      erro: "Usuário não encontrado",
    });
  }

  // Remove o usuário do array
  const usuarioRemovido = usuarios.splice(indice, 1)[0];

  res.json({
    mensagem: "Usuário removido com sucesso!",
    usuario: usuarioRemovido,
  });
});

// Iniciando o Servidor (SEMPRE POR ÚLTIMO)
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
