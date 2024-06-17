const html = document.querySelector('html')
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const timer = document.querySelector('#timer');

//Botões
const botoes = document.querySelectorAll('.app__card-button')
const focoButton = document.querySelector('.app__card-button--foco');
const curtoButton = document.querySelector('.app__card-button--curto');
const longoButton = document.querySelector('.app__card-button--longo');

// Otimize sua produtividade, mergulhe no que importa.
// Que tal dar uma respirada? Faça uma pausa curta!
// Hora de voltar à superfície. Faça uma pausa longa.


focoButton.addEventListener('click', () => {
    alterarContexto('foco');
    focoButton.classList.add('active');
})

curtoButton.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoButton.classList.add('active');
})

longoButton.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoButton.classList.add('active');
})

function alterarContexto(contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;

            break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;

            break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;

            break;

        default:
            break;
    }
}