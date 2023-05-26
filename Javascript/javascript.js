// Armazena as pessoas cadastradas
var pessoas = [];

// Função para cadastrar uma pessoa
function cadastrarPessoa(event) {
  event.preventDefault(); // Impede o envio do formulário

  // Obtém os valores do formulário
  var nome = document.getElementById("nome").value;
  // var idade = document.getElementById("idade").value;
  // var email = document.getElementById("email").value;

  // Cria um objeto pessoa
  var pessoa = {
    nome: nome,
    // idade: idade,
    // email: email
  };

  // Adiciona a pessoa ao array de pessoas
  pessoas.push(pessoa);

  // Limpa os campos do formulário
  document.getElementById("nome").value = "";
  // document.getElementById("idade").value = "";
  // document.getElementById("email").value = "";

  // Atualiza a lista de pessoas cadastradas
  atualizarPessoasCadastradas();

  return false;
}

// Função para atualizar a lista de pessoas cadastradas
function atualizarPessoasCadastradas() {
  var listaPessoas = document.getElementById("pessoasCadastradas");
  listaPessoas.innerHTML = "";

  // Cria um elemento <li> para cada pessoa cadastrada
  pessoas.forEach(function(pessoa) {
    var itemLista = document.createElement("li");
     itemLista.textContent = pessoa.nome ;
    listaPessoas.appendChild(itemLista);
  });
}

// Função para sortear os times
function sortearTimes() {
var timesSorteados = document.getElementById("timesSorteados");
timesSorteados.innerHTML = "";

// Verifica se há pessoas suficientes para formar times
if (pessoas.length < 2) {
var itemLista = document.createElement("li");
itemLista.textContent = "É necessário pelo menos 2 pessoas cadastradas para sortear os times.";
timesSorteados.appendChild(itemLista);
return;
}

// Copia o array de pessoas para não alterar o original
var pessoasSorteio = pessoas.slice();

// Embaralha o array de pessoas para sortear aleatoriamente
for (var i = pessoasSorteio.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1));
var temp = pessoasSorteio[i];
pessoasSorteio[i] = pessoasSorteio[j];
pessoasSorteio[j] = temp;
}

// Calcula o número de times completos
var numTimesCompletos = Math.floor(pessoasSorteio.length / 6);

// Cria os times completos com 6 jogadores cada
for (var k = 0; k < numTimesCompletos; k++) {
var time = pessoasSorteio.slice(k * 6, (k + 1) * 6);

// Cria um elemento <li> para cada time
var itemListaTime = document.createElement("li");
itemListaTime.textContent = "Time " + (k + 1) + ": " + time.map(function(pessoa) { return pessoa.nome; }).join(", ");
timesSorteados.appendChild(itemListaTime);
}

// Verifica se há jogadores restantes para formar um time adicional
var jogadoresRestantes = pessoasSorteio.slice(numTimesCompletos * 6);
if (jogadoresRestantes.length > 0) {
var itemListaTimeRestante = document.createElement("li");
itemListaTimeRestante.textContent = "Time Adicional: " + jogadoresRestantes.map(function(pessoa) { return pessoa.nome; }).join(", ");
timesSorteados.appendChild(itemListaTimeRestante);
}
}

// Adiciona um ouvinte de evento para o formulário de cadastro
var form = document.getElementById("cadastroForm");
form.addEventListener("submit", cadastrarPessoa);

// Adiciona um ouvinte de evento para o botão de sortear times
var sortearButton = document.getElementById("sortearButton");
sortearButton.addEventListener("click", sortearTimes);
