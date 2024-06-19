// Selecionar elementos para adicionar tarefas
const adicionarTarefaButton = document.querySelector('.app__button--add-task');
const salvarTarefaForm = document.querySelector('.app__form-add-task');
const cancelarTarefaForm = document.querySelector('.app__form-footer__button--cancel');
const deletarTarefaForm = document.querySelector('.app__form-footer__button--delete');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

// Armazenar no localStorage e converter para para uma string em formato JSON
const listaDeTarefas = JSON.parse(localStorage.getItem('tarefas')) || []

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas))
}

// Limpar textArea
function limparTextArea() {
    textArea.value = ''
}

// Esconder formulário
function esconderForm() {
    salvarTarefaForm.classList.add('hidden');
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    // Transformar tarefa em um HTML
    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const button = document.createElement('button')
    const imagemButton = document.createElement('img')

    imagemButton.setAttribute('src', '/imagens/edit.png')

    button.append(imagemButton)
    button.classList.add('app_button-edit')

    button.onclick = () => {
        const novaDescricao = prompt('Qual é o novo nome da tarefa?');

        if (novaDescricao) {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        }
    }

    li.append(svg);
    li.append(paragrafo);
    li.append(button);

    return li
}

// Ao clicar no botão deletar limpar textArea
deletarTarefaForm.addEventListener('click', () => {
    limparTextArea();
})

// Ao clicar no botão cancelar limpar textArea e ocultar formulário
cancelarTarefaForm.addEventListener('click', () => {
    esconderForm();
    limparTextArea();
})

// Ao clicar no botão adicionar tarefa alternar a visibilidade do formulário
adicionarTarefaButton.addEventListener('click', () => {
    salvarTarefaForm.classList.toggle('hidden')
})

// Prevenção do evento de submissão do form
salvarTarefaForm.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    // Adicionar tarefa ao array
    listaDeTarefas.push(tarefa)
    // Mostrar tarefa na lista
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa)

    atualizarTarefas();
    esconderForm();
    limparTextArea();
})

listaDeTarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});