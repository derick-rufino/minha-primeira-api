// Array com usuários fictícios
let usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    idade: 25,
    ativo: true,
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    idade: 30,
    ativo: true,
  },
  {
    id: 3,
    nome: "Pedro Costa",
    email: "pedro@email.com",
    idade: 28,
    ativo: false,
  },
];

// Função para gerar novo ID automaticamente
function gerarNovoId() {
  if (usuarios.length === 0) return 1;
  return Math.max(...usuarios.map((user) => user.id)) + 1;
}

// Exporta os dados e função para usar em outros arquivos
module.exports = { usuarios, gerarNovoId };
