document.addEventListener("DOMContentLoaded", function() {
    const tela = document.getElementById('labrintotela');
    const conteudo = tela.getContext('2d');
    
    const tamanho = 30;
    let jogoFinalizado = false;
    let comecarTempo = null;
    let intervaloDoTimer;
    let tempoCorrendo = false;
    let passouAzul = false; 
    let labirinto;
    let horaInicio = null;

    const niveis = [
        [
            [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
    ];
    
function desenharLabirinto() {
        for (let linha = 0; linha < labirinto.length; linha++) {
            for (let coluna = 0; coluna < labirinto[linha].length; coluna++) {
                if (labirinto[linha][coluna] === 1) {
                    conteudo.fillStyle = 'black'; // Parede
                    conteudo.fillRect(coluna * tamanho, linha * tamanho, tamanho, tamanho);
                } else if (labirinto[linha][coluna] === 0) {
                    conteudo.fillStyle = 'white'; // Caminho
                    conteudo.fillRect(coluna * tamanho, linha * tamanho, tamanho, tamanho);
                } else if (labirinto[linha][coluna] === 2) {
                    conteudo.fillStyle = 'green'; // Fim
                    conteudo.fillRect(coluna * tamanho, linha * tamanho, tamanho, tamanho);
                } else if (labirinto[linha][coluna] === 3) {
                    conteudo.fillStyle = 'blue'; // Inicio
                    conteudo.fillRect(coluna * tamanho, linha * tamanho, tamanho, tamanho);
                }
            }
        }
    }

    function renderizar() {
        conteudo.clearRect(0, 0, tela.width, tela.height);
        desenharLabirinto();
    const displayTimer = document.createElement('div');
    displayTimer.id = 'timer';
    displayTimer.textContent = 'Tempo: 0s';
    document.querySelector('.container').appendChild(displayTimer);
};
    
    function comecarNivel(y) {
        labirinto = niveis[y];
        jogoFinalizado = false;
        passouAzul = false;
        tempoCorrendo = false;
        clearInterval(intervaloDoTimer);
        comecarTempo = null;
        document.getElementById('timer').textContent = 'Tempo: 0s';
        renderizar();
        tela.addEventListener("mousemove", moverMouseHandler);
    }

    const botaoIniciar = document.getElementById('Start');
    botaoIniciar.addEventListener('click', () => {
        nivelAtual = 0;
        comecarNivel(nivelAtual); 
    });

    function moverMouseHandler(event) {
        if (!jogoFinalizado) {
            const rect = tela.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            verificarColisaoComMouse(mouseX, mouseY);
        }
    }

    function verificarColisaoComMouse(mouseX, mouseY) {
        const gridX = Math.floor(mouseX / tamanho);
        const gridY = Math.floor(mouseY / tamanho);

        
        if (labirinto[gridY] && labirinto[gridY][gridX] === 3 && !tempoCorrendo) {
            horaInicio = Date.now();
            intervaloDoTimer = setInterval(atualizarTempo, 1000);
            tempoCorrendo = true;
            passouAzul = true;
        }

        if (passouAzul && labirinto[gridY] && labirinto[gridY][gridX] === 2) {
            clearInterval(intervaloDoTimer);
            tempoCorrendo = false;
            alert("Você venceu! " + document.getElementById('timer').textContent);
            jogoFinalizado = true;
            tela.removeEventListener("mousemove", moverMouseHandler);
            window.location.href = "Nivel2.html";
        }

        if (labirinto[gridY] && labirinto[gridY][gridX] === 1 && passouAzul) {
            clearInterval(intervaloDoTimer);
            tempoCorrendo = false;
            alert("Você perdeu! Você bateu na parede.");
            jogoFinalizado = true;
            tela.removeEventListener("mousemove", moverMouseHandler);
        }
    }

    function atualizarTempo() {
        if (horaInicio && !jogoFinalizado) {
            const horaAtual = Date.now();
            const tempoDecorrido = Math.floor((horaAtual - horaInicio) / 1000);
            document.getElementById('timer').textContent = `Tempo: ${tempoDecorrido}s`;
        }
    }

    }

    
