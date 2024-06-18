const html = document.querySelector('html')
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

// Timer
let timerEmSegundos = 1500
const startPauseButton = document.querySelector('#start-pause');
let intervaloID = null;
const exibirTimer = document.querySelector('#timer')

// Botões
const botoes = document.querySelectorAll('.app__card-button')
const focoButton = document.querySelector('.app__card-button--foco');
const curtoButton = document.querySelector('.app__card-button--curto');
const longoButton = document.querySelector('.app__card-button--longo');
const iniciarOuPausarButton = document.querySelector('#start-pause  span');
const iniciarOuPausarButtonIcone = document.querySelector(".app__card-primary-butto-icon");

// Músicas
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
const somPlay = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const somBeep = new Audio('/sons/beep.mp3');


musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoButton.addEventListener('click', () => {
    timerEmSegundos = 1500;
    alterarContexto('foco');
    focoButton.classList.add('active');
})

curtoButton.addEventListener('click', () => {
    timerEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoButton.classList.add('active');
})

longoButton.addEventListener('click', () => {
    timerEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoButton.classList.add('active');
})

function alterarContexto(contexto) {
    exibirTimerNaTela();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            zerar()

            break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            zerar()

            break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            zerar()

            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (timerEmSegundos <= 0) {
        somBeep.play();
        zerar();
        return
    }
    timerEmSegundos -= 1;
    exibirTimerNaTela();
}

startPauseButton.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloID) {
        somPause.play();
        zerar();
        return
    }
    intervaloID = setInterval(contagemRegressiva, 1000);
    somPlay.play();
    iniciarOuPausarButton.textContent = ('Pausar');
    iniciarOuPausarButtonIcone.setAttribute('src', `/imagens/pause.png`);
}

function zerar() {
    iniciarOuPausarButton.textContent = ('Começar');
    iniciarOuPausarButtonIcone.setAttribute('src', `/imagens/play_arrow.png`);
    clearInterval(intervaloID);
    intervaloID = null;
}

function exibirTimerNaTela() {
    const tempo = new Date(timerEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' });
    exibirTimer.innerHTML = `${tempoFormatado}`
}

exibirTimerNaTela();
