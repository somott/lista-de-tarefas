# Kanban de Tarefas

Um app simples de Kanban feito com HTML, CSS e JavaScript puro (sem frameworks), com 3 colunas: "A Fazer", "Fazendo" e "Concluído". As tarefas podem ser arrastadas entre as colunas com o mouse.

## Como usar

Basta abrir o arquivo `index.html` no navegador. Não precisa instalar nada nem rodar servidor.

## Estrutura do projeto

- **`index.html`** — A estrutura da página: o título, o campo de texto para digitar a tarefa, o botão de adicionar e as três colunas do quadro (cada uma com sua própria lista). É o "esqueleto" do app.
- **`style.css`** — A aparência do app: paleta de cores esverdeada, espaçamentos, formato das colunas e dos cartões, e o efeito visual enquanto um cartão está sendo arrastado.
- **`script.js`** — O comportamento do app: adiciona novas tarefas (sempre na coluna "A Fazer"), permite arrastar e soltar cartões entre colunas, apaga tarefas ao clicar em "Apagar", e salva tudo no `localStorage` do navegador — incluindo em qual coluna cada tarefa está — para nada se perder ao recarregar a página.

## Como funciona por baixo dos panos

1. Cada tarefa é um objeto com três campos: `id` (identificador único), `texto` (a descrição) e `coluna` (`"afazer"`, `"fazendo"` ou `"concluido"`).
2. Todas as tarefas ficam guardadas numa lista (array) chamada `tarefas`.
3. `renderizarTarefas()` percorre as três colunas do HTML e, para cada uma, desenha só as tarefas cujo campo `coluna` combina com ela.
4. O drag and drop usa os eventos nativos do navegador:
   - `dragstart` / `dragend` no cartão: marca visualmente qual cartão está sendo arrastado.
   - `dragover` na coluna: calcula, com base na posição do mouse, onde o cartão deve encaixar entre os outros, e o move ali mesmo no HTML.
   - `drop` na coluna: quando o cartão é solto, o código relê a ordem atual do HTML em todas as colunas e atualiza o array `tarefas` para refletir a nova posição e coluna.
5. Toda vez que a lista muda (adiciona, move ou apaga), salvamos o array `tarefas` no `localStorage` (memória do navegador), para persistir os dados.
