// Selecionar elementos para adicionar tarefas
const adicionarTarefaButton = document.querySelector('.app__button--add-task');
const adicionarTarefaForm = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

const listaDeTarefas = JSON.parse(localStorage.getItem('tarefas')) || []

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

    li.append(svg);
    li.append(paragrafo);
    li.append(button);

    return li
}

// Ao clicar no botão adicionar tarefa alternar a visibilidade do formulário
adicionarTarefaButton.addEventListener('click', () => {
    adicionarTarefaForm.classList.toggle('hidden')
})

// Prevenção do evento de submissão do form
adicionarTarefaForm.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    // Adicionar tarefa ao array
    listaDeTarefas.push(tarefa)
    // Mostrar tarefa na lista
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa)
    // Armazenar no localStorage e converter para para uma string em formato JSON
    localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas))
    // Limpar textArea e esconder formulário
    textArea.value = ''
    adicionarTarefaForm.classList.add('hidden');
})

listaDeTarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});