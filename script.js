const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');
const mensagemVazia = document.getElementById('mensagem-vazia');

let tarefas = carregarTarefas();

function carregarTarefas() {
  const salvas = localStorage.getItem('tarefas');
  return salvas ? JSON.parse(salvas) : [];
}

function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function renderizarTarefas() {
  lista.innerHTML = '';

  tarefas.forEach((tarefa, indice) => {
    const item = document.createElement('li');
    if (tarefa.concluida) {
      item.classList.add('concluida');
    }

    const texto = document.createElement('span');
    texto.textContent = tarefa.texto;
    texto.addEventListener('click', () => alternarConcluida(indice));

    const botaoApagar = document.createElement('button');
    botaoApagar.textContent = 'Apagar';
    botaoApagar.className = 'btn-apagar';
    botaoApagar.addEventListener('click', () => apagarTarefa(indice));

    item.appendChild(texto);
    item.appendChild(botaoApagar);
    lista.appendChild(item);
  });

  mensagemVazia.classList.toggle('escondido', tarefas.length > 0);
}

function adicionarTarefa(texto) {
  tarefas.push({ texto, concluida: false });
  salvarTarefas();
  renderizarTarefas();
}

function alternarConcluida(indice) {
  tarefas[indice].concluida = !tarefas[indice].concluida;
  salvarTarefas();
  renderizarTarefas();
}

function apagarTarefa(indice) {
  tarefas.splice(indice, 1);
  salvarTarefas();
  renderizarTarefas();
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const texto = input.value.trim();
  if (texto === '') {
    return;
  }
  adicionarTarefa(texto);
  input.value = '';
  input.focus();
});

renderizarTarefas();
