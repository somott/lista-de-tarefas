const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const listasPorColuna = document.querySelectorAll('.lista-tarefas');

let tarefas = carregarTarefas();

function carregarTarefas() {
  const salvas = localStorage.getItem('tarefas');
  if (!salvas) {
    return [];
  }

  // Ajusta tarefas salvas pela versão antiga do app (sem id/coluna)
  return JSON.parse(salvas).map((tarefa) => ({
    id: tarefa.id || criarId(),
    texto: tarefa.texto,
    coluna: tarefa.coluna || (tarefa.concluida ? 'concluido' : 'afazer'),
  }));
}

function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function criarCartao(tarefa) {
  const item = document.createElement('li');
  item.className = 'cartao-tarefa';
  item.draggable = true;
  item.dataset.id = tarefa.id;

  const texto = document.createElement('span');
  texto.textContent = tarefa.texto;

  const botaoApagar = document.createElement('button');
  botaoApagar.textContent = 'Apagar';
  botaoApagar.className = 'btn-apagar';
  botaoApagar.addEventListener('click', () => apagarTarefa(tarefa.id));

  item.appendChild(texto);
  item.appendChild(botaoApagar);

  item.addEventListener('dragstart', () => {
    item.classList.add('arrastando');
  });

  item.addEventListener('dragend', () => {
    item.classList.remove('arrastando');
  });

  return item;
}

function renderizarTarefas() {
  listasPorColuna.forEach((lista) => {
    const coluna = lista.dataset.coluna;
    lista.innerHTML = '';

    tarefas
      .filter((tarefa) => tarefa.coluna === coluna)
      .forEach((tarefa) => {
        lista.appendChild(criarCartao(tarefa));
      });
  });
}

function adicionarTarefa(texto) {
  tarefas.push({ id: criarId(), texto, coluna: 'afazer' });
  salvarTarefas();
  renderizarTarefas();
}

function apagarTarefa(id) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  salvarTarefas();
  renderizarTarefas();
}

// Descobre, dentro de uma coluna, depois de qual cartão o mouse está
// (usado para saber onde encaixar o cartão que está sendo arrastado)
function encontrarCartaoDepoisDoMouse(lista, posicaoY) {
  const cartoes = [...lista.querySelectorAll('.cartao-tarefa:not(.arrastando)')];

  return cartoes.reduce((maisProximo, cartaoAtual) => {
    const caixa = cartaoAtual.getBoundingClientRect();
    const distancia = posicaoY - caixa.top - caixa.height / 2;

    if (distancia < 0 && distancia > maisProximo.distancia) {
      return { distancia, elemento: cartaoAtual };
    }
    return maisProximo;
  }, { distancia: Number.NEGATIVE_INFINITY, elemento: null }).elemento;
}

// Depois de soltar um cartão, lê a ordem atual do DOM em cada coluna
// e atualiza o array "tarefas" para refletir a nova posição/coluna.
function sincronizarTarefasComTela() {
  const novasTarefas = [];

  listasPorColuna.forEach((lista) => {
    const coluna = lista.dataset.coluna;
    const idsNaOrdem = [...lista.querySelectorAll('.cartao-tarefa')].map((el) => el.dataset.id);

    idsNaOrdem.forEach((id) => {
      const tarefa = tarefas.find((t) => t.id === id);
      if (tarefa) {
        novasTarefas.push({ ...tarefa, coluna });
      }
    });
  });

  tarefas = novasTarefas;
  salvarTarefas();
}

listasPorColuna.forEach((lista) => {
  lista.addEventListener('dragover', (evento) => {
    evento.preventDefault();
    lista.classList.add('arraste-sobre');

    const cartaoArrastando = document.querySelector('.arrastando');
    const cartaoDepois = encontrarCartaoDepoisDoMouse(lista, evento.clientY);

    if (cartaoDepois === null) {
      lista.appendChild(cartaoArrastando);
    } else {
      lista.insertBefore(cartaoArrastando, cartaoDepois);
    }
  });

  lista.addEventListener('dragleave', () => {
    lista.classList.remove('arraste-sobre');
  });

  lista.addEventListener('drop', () => {
    lista.classList.remove('arraste-sobre');
    sincronizarTarefasComTela();
  });
});

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
