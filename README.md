# Lista de Tarefas

Um app simples de lista de tarefas feito com HTML, CSS e JavaScript puro (sem frameworks).

## Como usar

Basta abrir o arquivo `index.html` no navegador. Não precisa instalar nada nem rodar servidor.

## Estrutura do projeto

- **`index.html`** — A estrutura da página: o título, o campo de texto para digitar a tarefa, o botão de adicionar e a lista onde as tarefas aparecem. É o "esqueleto" do app.
- **`style.css`** — A aparência do app: cores, espaçamentos, formato dos botões, e o estilo especial (texto riscado) para tarefas concluídas.
- **`script.js`** — O comportamento do app: adiciona novas tarefas, marca/desmarca como concluída ao clicar no texto, apaga tarefas ao clicar em "Apagar", e salva tudo no `localStorage` do navegador para as tarefas não sumirem ao recarregar a página.

## Como funciona por baixo dos panos

1. Cada tarefa é um objeto com dois campos: `texto` (a descrição) e `concluida` (verdadeiro ou falso).
2. Todas as tarefas ficam guardadas numa lista (array) chamada `tarefas`.
3. Toda vez que essa lista muda (adiciona, marca ou apaga), duas coisas acontecem:
   - Salvamos a lista no `localStorage` (memória do navegador), para persistir os dados.
   - Redesenhamos a lista na tela (`renderizarTarefas`).
