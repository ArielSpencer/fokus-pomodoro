// Selecionar elementos para adicionar tarefas
const adicionarTarefaButton = document.querySelector('.app__button--add-task');
const salvarTarefaForm = document.querySelector('.app__form-add-task');
const cancelarTarefaForm = document.querySelector('.app__form-footer__button--cancel');
const deletarTarefaForm = document.querySelector('.app__form-footer__button--delete');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoDecricaoTarefa = document.querySelector('.app__section-active-task-description');

const removerConcluidasButton = document.querySelector('#btn-remover-concluidas');
const removerTodasButton = document.querySelector('#btn-remover-todas');

// Armazenar no localStorage e converter para para uma string em formato JSON
let listaDeTarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let liTarefaSelecionada = null

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
    const removeButton = document.createElement('removeButton')
    const imagemEditButton = document.createElement('img')
    const imagemRemoveButton = document.createElement('img')

    imagemEditButton.setAttribute('src', '/imagens/edit.png')
    
    button.append(imagemEditButton)
    button.classList.add('app_button-edit')

    imagemRemoveButton.setAttribute('src', '/imagens/remove.png')
    
    removeButton.append(imagemRemoveButton)
    removeButton.classList.add('app_button-remove')

    // Adicionar Tarefa na lista e localStorage
    button.onclick = () => {
        const novaDescricao = prompt('Qual é o novo nome da tarefa?');

        if (novaDescricao) {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        }
    }

   // Alterar o status da tarefa pelo svg de check
   svg.onclick = () => {
    if (tarefa.completa) {
        // Marcar como não concluída
        li.classList.remove('app__section-task-list-item-complete');
        li.querySelector('.app_button-edit').removeAttribute('disabled');
        tarefa.completa = false;
    } else {
        // Marcar como concluída
        li.classList.add('app__section-task-list-item-complete');
        li.querySelector('.app_button-edit').setAttribute('disabled', 'disabled');
        tarefa.completa = true;
    }
    atualizarTarefas();
}

    // Remover a tarefa da lista e do localStorage
    removeButton.onclick = () => {
        listaDeTarefas = listaDeTarefas.filter(t => t !== tarefa);
        atualizarTarefas();
    
        li.remove();
    }

    li.append(svg);
    li.append(paragrafo);
    li.append(button);
    li.append(removeButton);

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        button.setAttribute('disabled', 'disabled')

    } else {
        // Mostrar descrição de tarefa em andamento
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                })

            if (tarefaSelecionada == tarefa) {
                paragrafoDecricaoTarefa.textContent = ''
                tarefaSelecionada = null
                liTarefaSelecionada = null
                return
            }
            tarefaSelecionada = tarefa
            liTarefaSelecionada = li
            paragrafoDecricaoTarefa.textContent = tarefa.descricao

            li.classList.add('app__section-task-list-item-active')
        }
    }

    return li
}

// Ao clicar no botão deletar do form limpar textArea
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

// Quando timer foco for concluido, remover class active, adicionar class complete e desabilitar botão da tarefa
document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
        paragrafoDecricaoTarefa.textContent = null
        tarefaSelecionada.completa = true
        atualizarTarefas();
    }
})


// Remover tarefas
const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item'
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    listaDeTarefas = somenteCompletas ? listaDeTarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas()
}

const removerTarefaSelecionada = (somenteCompletas) => {
    const seletor = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item'
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    listaDeTarefas = somenteCompletas ? listaDeTarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas()
    limparTextArea()
}

removerConcluidasButton.onclick = () => removerTarefas(true)
removerTodasButton.onclick = () => removerTarefas(false)