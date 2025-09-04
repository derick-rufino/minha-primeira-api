# 📚 Guia Completo: Criando sua Primeira API com Node.js e Express

## 🎯 Índice

1. [Introdução](#introdução)
2. [O que é Node.js e Express?](#o-que-é-nodejs-e-express)
3. [Iniciando um Projeto Node.js](#iniciando-um-projeto-nodejs)
4. [Instalando e Configurando o Express](#instalando-e-configurando-o-express)
5. [Entendendo CORS](#entendendo-cors)
6. [Entendendo req (Request) e res (Response)](#entendendo-req-request-e-res-response)
7. [Análise do Código - Bloco por Bloco](#análise-do-código---bloco-por-bloco)
8. [Métodos HTTP Explicados](#métodos-http-explicados)
9. [Conversões de Tipo e Declarações](#conversões-de-tipo-e-declarações)
10. [Testando sua API](#testando-sua-api)
11. [Próximos Passos](#próximos-passos)

---

## 🌟 Introdução

Este guia foi criado para explicar de forma didática como construir uma API (Interface de Programação de Aplicações) usando Node.js e Express. Uma API é como um garçom em um restaurante: ela recebe pedidos (requisições), busca as informações necessárias e entrega a resposta.

**O que você vai aprender:**

- Como criar um servidor web
- Como configurar rotas para diferentes funcionalidades
- Como receber e enviar dados
- Como gerenciar uma lista de usuários

---

## 🤔 O que é Node.js e Express?

### Node.js

**Node.js** é um ambiente de execução que permite rodar JavaScript no servidor (computador), não apenas no navegador. É como se fosse um "tradutor" que entende JavaScript e executa suas instruções no servidor.

**Por que usar Node.js?**

- Rápido e eficiente
- Mesma linguagem (JavaScript) no front-end e back-end
- Grande comunidade e muitas bibliotecas disponíveis

### Express

**Express** é um framework (conjunto de ferramentas) para Node.js que facilita a criação de servidores web e APIs. É como ter um kit de ferramentas prontas para construir uma casa, em vez de fazer tudo do zero.

**O que o Express oferece:**

- Sistema de rotas (caminhos da API)
- Middleware (funções que processam requisições)
- Facilita o envio e recebimento de dados

---

## 🚀 Iniciando um Projeto Node.js

### Passo 1: Criar a pasta do projeto

```bash
mkdir minha-primeira-api
cd minha-primeira-api
```

### Passo 2: Inicializar o projeto Node.js

```bash
npm init -y
```

Este comando cria o arquivo `package.json`, que é como uma "carteira de identidade" do seu projeto, contendo:

- Nome do projeto
- Versão
- Dependências (bibliotecas que o projeto usa)
- Scripts (comandos personalizados)

**Exemplo de package.json:**

```json
{
  "name": "minha-primeira-api",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

---

## 📦 Instalando e Configurando o Express

### Instalação do Express

```bash
npm install express
```

Este comando:

- Baixa o Express da internet
- Adiciona ele na pasta `node_modules`
- Registra como dependência no `package.json`

### Instalação do CORS

```bash
npm install cors
```

### Instalação do Nodemon (para desenvolvimento)

```bash
npm install -D nodemon
```

**Nodemon** reinicia automaticamente o servidor quando você salva alterações no código.

---

## 🌐 Entendendo CORS

**CORS** (Cross-Origin Resource Sharing) é uma política de segurança dos navegadores. Imagine que você tem uma loja (seu site) e quer permitir que pessoas de outras cidades (outros domínios) comprem seus produtos (acessem sua API).

**Problema sem CORS:**
Se seu site está em `localhost:3000` e sua API em `localhost:8080`, o navegador bloqueia a comunicação por segurança.

**Solução com CORS:**
Configuramos cabeçalhos HTTP que dizem: "Ei navegador, está tudo bem, pode deixar essa comunicação passar!"

---

## � Entendendo req (Request) e res (Response)

Em toda função de rota no Express, você sempre verá dois parâmetros principais: `req` e `res`. Eles são como duas caixas especiais que carregam informações importantes sobre a comunicação entre cliente e servidor.

### 🔍 req (Request) - A Requisição

O objeto `req` representa a **requisição** que chegou do cliente (navegador, aplicativo, etc.). É como uma carta que alguém te enviou, contendo todas as informações sobre o que essa pessoa está pedindo.

**Analogia:** Imagine que `req` é como um pedido de delivery que chegou no restaurante. O pedido contém:

- Quem está pedindo (de onde veio)
- O que está pedindo (dados)
- Como quer receber (método)
- Informações extras (cabeçalhos)

#### Principais Propriedades do req:

```javascript
app.get("/usuarios/:id", (req, res) => {
  // 1. PARÂMETROS DA URL
  const id = req.params.id; // Pega ":id" da URL
  console.log("ID solicitado:", id); // Se URL for /usuarios/123, id = "123"

  // 2. QUERY PARAMETERS (depois do ?)
  const filtro = req.query.ativo; // Se URL for /usuarios/123?ativo=true
  console.log("Filtro:", filtro); // filtro = "true"

  // 3. CABEÇALHOS DA REQUISIÇÃO
  const userAgent = req.headers["user-agent"]; // Qual navegador está usando
  const contentType = req.headers["content-type"]; // Tipo de conteúdo

  // 4. MÉTODO HTTP
  console.log("Método:", req.method); // GET, POST, DELETE, etc.

  // 5. URL COMPLETA
  console.log("URL:", req.url); // /usuarios/123?ativo=true

  // 6. ENDEREÇO IP DO CLIENTE
  console.log("IP:", req.ip); // Endereço de quem fez a requisição
});

app.post("/usuarios", (req, res) => {
  // 7. CORPO DA REQUISIÇÃO (dados enviados)
  const { nome, email, idade } = req.body;
  console.log("Dados recebidos:", req.body);

  // 8. ARQUIVOS ENVIADOS (se houver)
  // const arquivo = req.file; // Com middleware multer
});
```

#### Exemplos Práticos do req:

**Exemplo 1: Capturando parâmetros da URL**

```javascript
// URL: /usuarios/42
app.get("/usuarios/:id", (req, res) => {
  const userId = req.params.id; // "42"
  console.log(`Buscando usuário com ID: ${userId}`);
});
```

**Exemplo 2: Query parameters (filtros)**

```javascript
// URL: /usuarios?idade=25&ativo=true
app.get("/usuarios", (req, res) => {
  const idade = req.query.idade; // "25"
  const ativo = req.query.ativo; // "true"

  console.log(`Filtrar por idade: ${idade}, ativo: ${ativo}`);
});
```

**Exemplo 3: Dados do corpo (POST)**

```javascript
// Dados enviados: { "nome": "João", "email": "joao@email.com" }
app.post("/usuarios", (req, res) => {
  const dadosRecebidos = req.body;
  console.log("Nome:", req.body.nome); // "João"
  console.log("Email:", req.body.email); // "joao@email.com"
});
```

### 📤 res (Response) - A Resposta

O objeto `res` representa a **resposta** que você vai enviar de volta para o cliente. É como a comida pronta que o restaurante entrega para quem fez o pedido.

**Analogia:** O `res` é como o entregador do delivery. Ele:

- Leva a comida (dados)
- Carrega informações sobre o pedido (status)
- Pode levar extras (cabeçalhos)
- Confirma se deu tudo certo (códigos de status)

#### Principais Métodos do res:

```javascript
app.get("/usuarios", (req, res) => {
  // 1. ENVIAR DADOS EM JSON
  res.json({
    mensagem: "Lista de usuários",
    dados: usuarios,
  });

  // 2. DEFINIR STATUS HTTP
  res.status(200); // Sucesso
  res.status(404); // Não encontrado
  res.status(500); // Erro do servidor

  // 3. COMBINAR STATUS + JSON
  res.status(201).json({
    mensagem: "Usuário criado!",
    usuario: novoUsuario,
  });

  // 4. ENVIAR TEXTO SIMPLES
  res.send("Servidor funcionando!");

  // 5. ADICIONAR CABEÇALHOS
  res.header("X-Total-Count", usuarios.length);
  res.set("Content-Type", "application/json");

  // 6. REDIRECIONAR
  res.redirect("/usuarios");

  // 7. ENVIAR ARQUIVOS
  res.sendFile("/caminho/para/arquivo.html");

  // 8. DEFINIR COOKIES
  res.cookie("usuario", "joao", { maxAge: 900000 });
});
```

#### Códigos de Status HTTP Mais Comuns:

```javascript
// ✅ SUCESSOS (2xx)
res.status(200); // OK - Tudo certo
res.status(201); // Created - Criado com sucesso
res.status(204); // No Content - Sucesso, sem conteúdo

// ❌ ERROS DO CLIENTE (4xx)
res.status(400); // Bad Request - Dados inválidos
res.status(401); // Unauthorized - Não autorizado
res.status(404); // Not Found - Não encontrado
res.status(409); // Conflict - Conflito (email já existe)

// 💥 ERROS DO SERVIDOR (5xx)
res.status(500); // Internal Server Error - Erro interno
res.status(503); // Service Unavailable - Serviço indisponível
```

#### Exemplos Práticos do res:

**Exemplo 1: Resposta de sucesso com dados**

```javascript
app.get("/usuarios", (req, res) => {
  res.status(200).json({
    sucesso: true,
    total: usuarios.length,
    dados: usuarios,
  });
});
```

**Exemplo 2: Resposta de erro**

```javascript
app.get("/usuarios/:id", (req, res) => {
  const usuario = usuarios.find((u) => u.id === parseInt(req.params.id));

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado",
      codigo: "USER_NOT_FOUND",
    });
  }

  res.json(usuario);
});
```

**Exemplo 3: Criação com status específico**

```javascript
app.post("/usuarios", (req, res) => {
  const novoUsuario = {
    id: gerarNovoId(),
    nome: req.body.nome,
    email: req.body.email,
  };

  usuarios.push(novoUsuario);

  // Status 201 = "Created"
  res.status(201).json({
    mensagem: "Usuário criado com sucesso!",
    usuario: novoUsuario,
  });
});
```

### 🔄 Fluxo Completo: req → processamento → res

```javascript
app.post("/usuarios", (req, res) => {
  // 1. RECEBER dados do req
  const { nome, email, idade } = req.body;

  // 2. PROCESSAR (validar, salvar, etc.)
  if (!nome || !email) {
    // 3. RESPONDER com erro
    return res.status(400).json({
      erro: "Nome e email são obrigatórios",
    });
  }

  // 4. CRIAR novo usuário
  const novoUsuario = {
    id: gerarNovoId(),
    nome,
    email,
    idade: idade || 18,
  };

  // 5. SALVAR
  usuarios.push(novoUsuario);

  // 6. RESPONDER com sucesso
  res.status(201).json({
    mensagem: "Usuário criado!",
    usuario: novoUsuario,
  });
});
```

### 🎯 Resumo req vs res

| **req (Request)**                      | **res (Response)**                         |
| -------------------------------------- | ------------------------------------------ |
| **O que É:** Pedido que chegou         | **O que É:** Resposta que você envia       |
| **Contém:** Dados do cliente           | **Contém:** Dados para o cliente           |
| **Você:** Lê informações               | **Você:** Escreve informações              |
| **Exemplos:** `req.body`, `req.params` | **Exemplos:** `res.json()`, `res.status()` |

**Regra de Ouro:**

- Use `req` para **receber** informações
- Use `res` para **enviar** informações de volta

---

## �🔍 Análise do Código - Bloco por Bloco

Vamos analisar cada parte do código do arquivo `app.js`:

### Bloco 1: Importações

```javascript
const express = require("express");
const { usuarios, gerarNovoId } = require("./dados/usuarios");
```

**Explicação:**

- `require()` é como "importar" ou "trazer" código de outros arquivos
- `express` traz todas as funcionalidades do framework Express
- `{ usuarios, gerarNovoId }` usa **destructuring** para pegar apenas essas duas coisas do arquivo `usuarios.js`

**Conversões/Declarações:**

- `const` declara uma constante (valor que não muda)
- **Destructuring**: `{usuarios, gerarNovoId}` extrai propriedades específicas de um objeto

### Bloco 2: Configuração Inicial

```javascript
const app = express();
const PORT = 3000;
```

**Explicação:**

- `express()` cria uma nova aplicação Express
- `PORT` define em qual porta o servidor vai "escutar" requisições
- Porta é como o número da sua casa - outros computadores usam ela para encontrar seu servidor

### Bloco 3: Middleware para JSON

```javascript
app.use(express.json());
```

**Explicação:**

- **Middleware** são funções que processam requisições antes delas chegarem nas suas rotas
- `express.json()` converte dados JSON recebidos em objetos JavaScript
- É como ter um tradutor que converte cartas em inglês para português antes de você ler

### Bloco 4: CORS Manual

```javascript
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
```

**Explicação:**

- Este middleware configura CORS manualmente
- `res.header()` adiciona cabeçalhos na resposta HTTP
- `"*"` significa "qualquer origem pode acessar"
- `OPTIONS` é um método HTTP usado pelo navegador para "perguntar" se pode fazer a requisição
- `next()` passa o controle para o próximo middleware

**Conversões/Declarações:**

- **Arrow function**: `(req, res, next) => {}` é uma função moderna
- **Conditional return**: `if (req.method === "OPTIONS") return ...` sai da função se a condição for verdadeira

### Bloco 5: Arquivos Estáticos

```javascript
app.use(express.static("."));
```

**Explicação:**

- Permite servir arquivos como HTML, CSS, JS, imagens
- `"."` significa "pasta atual"
- Se alguém acessar `localhost:3000/index.html`, o Express vai procurar este arquivo na pasta

### Bloco 6: Log Middleware

```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleString()}`);
  next();
});
```

**Explicação:**

- Registra no console todas as requisições que chegam
- **Template literal**: `` `${variavel}` `` permite inserir variáveis dentro de strings
- `req.method` é o tipo da requisição (GET, POST, etc.)
- `req.url` é o caminho acessado
- `new Date().toLocaleString()` cria uma data/hora formatada

**Conversões/Declarações:**

- **Template literals**: Strings com `${}` para inserir variáveis
- **Date object**: `new Date()` cria um objeto de data

---

## 🛣️ Métodos HTTP Explicados

### GET - Buscar Informações

**O que faz:** Pede informações do servidor, como uma pergunta: "Me mostra os usuários?"

#### Rota Principal (GET /)

```javascript
app.get("/", (req, res) => {
  res.json({
    mensagem: "Minha primeira API está rodando!",
    versao: "1.0.0",
    autor: "Derick Rufino",
  });
});
```

**Explicação:**

- Quando alguém acessa `localhost:3000/`, retorna informações básicas da API
- `res.json()` envia uma resposta em formato JSON

#### Listar Usuários (GET /usuarios)

```javascript
app.get("/usuarios", (req, res) => {
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
```

**Explicação:**

- Verifica se os dados existem (tratamento de erro)
- `usuarios.length` conta quantos usuários existem
- Retorna total e lista completa

**Conversões/Declarações:**

- **Conditional check**: `if (!usuarios)` verifica se existe
- **Object property**: `usuarios.length` acessa propriedade do array

#### Buscar Usuário Específico (GET /usuarios/:id)

```javascript
app.get("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((user) => user.id === id);

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado",
      id: id,
    });
  }

  res.json(usuario);
});
```

**Explicação:**

- `:id` é um **parâmetro de rota** - valor variável na URL
- `req.params.id` pega o valor do parâmetro
- `parseInt()` converte string para número
- `find()` procura um elemento no array que atenda a condição
- Status 404 = "Não encontrado"

**Conversões/Declarações:**

- **Type conversion**: `parseInt()` converte string → número
- **Array method**: `find()` busca elemento que atende condição
- **Arrow function**: `(user) => user.id === id` função de comparação

### POST - Criar Novas Informações

**O que faz:** Envia dados para criar algo novo, como preencher um formulário

```javascript
app.post("/usuarios", (req, res) => {
  const { nome, email, idade } = req.body;

  if (!nome || !email) {
    return res.status(400).json({
      erro: "Nome e email são obrigatórios",
    });
  }

  const emailExiste = usuarios.find((user) => user.email === email);
  if (emailExiste) {
    return res.status(400).json({
      erro: "Email já está em uso",
    });
  }

  const novoUsuario = {
    id: gerarNovoId(),
    nome: nome,
    email: email,
    idade: idade || 18,
    ativo: true,
  };

  usuarios.push(novoUsuario);

  res.status(201).json({
    mensagem: "Usuário criado com sucesso!",
    usuario: novoUsuario,
  });
});
```

**Explicação:**

- `req.body` contém os dados enviados na requisição
- **Destructuring** extrai nome, email e idade
- Validação verifica se campos obrigatórios foram preenchidos
- Verifica se email já existe (não pode duplicar)
- `gerarNovoId()` cria um ID único automaticamente
- `idade || 18` usa 18 se idade não foi informada (valor padrão)
- `push()` adiciona o novo usuário ao array
- Status 201 = "Criado com sucesso"

**Conversões/Declarações:**

- **Destructuring**: `{ nome, email, idade }` extrai propriedades
- **Logical OR**: `idade || 18` usa valor padrão
- **Object creation**: `{ id: ..., nome: ... }` cria novo objeto

### DELETE - Remover Informações

**O que faz:** Remove algo existente, como jogar no lixo

```javascript
app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = usuarios.findIndex((user) => user.id === id);

  if (indice === -1) {
    return res.status(404).json({
      erro: "Usuário não encontrado",
    });
  }

  const usuarioRemovido = usuarios.splice(indice, 1)[0];

  res.json({
    mensagem: "Usuário removido com sucesso!",
    usuario: usuarioRemovido,
  });
});
```

**Explicação:**

- `findIndex()` procura a posição do usuário no array
- Retorna -1 se não encontrar
- `splice(indice, 1)` remove 1 elemento na posição `indice`
- `[0]` pega o primeiro (e único) elemento removido

**Conversões/Declarações:**

- **Array method**: `findIndex()` encontra posição no array
- **Array method**: `splice()` modifica array removendo elementos
- **Array access**: `[0]` acessa primeiro elemento

### Iniciando o Servidor

```javascript
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

**Explicação:**

- `listen()` faz o servidor começar a "escutar" na porta especificada
- Callback function executa quando servidor inicia com sucesso
- **IMPORTANTE**: Deve sempre ser a última coisa no código

---

## 📊 Arquivo de Dados (dados/usuarios.js)

### Array de Usuários

```javascript
let usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    idade: 25,
    ativo: true,
  },
  // ... mais usuários
];
```

**Explicação:**

- `let` permite modificar a variável (adicionar/remover usuários)
- Array contém objetos com propriedades do usuário
- Dados ficam na memória (resetam quando servidor reinicia)

### Função Geradora de ID

```javascript
function gerarNovoId() {
  if (usuarios.length === 0) return 1;
  return Math.max(...usuarios.map((user) => user.id)) + 1;
}
```

**Explicação:**

- Se não há usuários, retorna ID 1
- `usuarios.map((user) => user.id)` cria array só com os IDs
- `...` (spread operator) "espalha" array como argumentos separados
- `Math.max()` encontra o maior número
- `+ 1` garante que novo ID seja único

**Conversões/Declarações:**

- **Array method**: `map()` transforma cada elemento
- **Spread operator**: `...` expande array
- **Math method**: `Math.max()` encontra maior valor

### Exportação

```javascript
module.exports = { usuarios, gerarNovoId };
```

**Explicação:**

- Torna variáveis e funções disponíveis para outros arquivos
- Outros arquivos podem importar usando `require()`

---

## 🧪 Testando sua API

### Usando o Navegador (apenas GET)

- `http://localhost:3000/` - Página inicial
- `http://localhost:3000/usuarios` - Lista usuários
- `http://localhost:3000/usuarios/1` - Usuário específico

### Usando Postman ou Thunder Client

#### Criar Usuário (POST)

```
URL: http://localhost:3000/usuarios
Método: POST
Body (JSON):
{
  "nome": "Ana Silva",
  "email": "ana@email.com",
  "idade": 27
}
```

#### Deletar Usuário (DELETE)

```
URL: http://localhost:3000/usuarios/1
Método: DELETE
```

### Usando cURL (terminal)

```bash
# Listar usuários
curl http://localhost:3000/usuarios

# Criar usuário
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Carlos","email":"carlos@email.com","idade":30}'

# Deletar usuário
curl -X DELETE http://localhost:3000/usuarios/1
```

---

## 🎯 Resumo dos Conceitos Importantes

### Declarações de Variáveis

- `const` - valor não muda (constante)
- `let` - valor pode mudar
- `var` - evitar usar (forma antiga)

### Conversões de Tipo

- `parseInt("123")` - string → número inteiro
- `String(123)` - número → string
- `Boolean(1)` - qualquer valor → true/false

### Métodos de Array

- `find()` - encontra primeiro elemento que atende condição
- `findIndex()` - encontra posição do elemento
- `map()` - transforma cada elemento
- `push()` - adiciona no final
- `splice()` - remove elementos

### Operadores Especiais

- `||` - OR lógico (valor padrão)
- `&&` - AND lógico
- `!` - NOT lógico (negação)
- `...` - spread operator

### Funções Modernas

- Arrow functions: `(param) => {}`
- Destructuring: `{nome, email} = objeto`
- Template literals: `` `Olá ${nome}` ``

---

## 🚀 Próximos Passos

1. **Banco de Dados**: Conectar com MongoDB ou PostgreSQL
2. **Autenticação**: Adicionar login e senhas
3. **Validação**: Usar bibliotecas como Joi ou Yup
4. **Testes**: Escrever testes automatizados
5. **Deploy**: Publicar na internet (Heroku, Vercel, etc.)

---

## 📚 Documentações Oficiais

- [Node.js](https://nodejs.org/docs/)
- [Express.js](https://expressjs.com/)
- [MDN HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [NPM](https://docs.npmjs.com/)

---

**Parabéns! 🎉 Você criou sua primeira API!**

Agora você entende como funciona o back-end de aplicações web. Continue praticando e experimentando com novos recursos!
