document.addEventListener("DOMContentLoaded", function() {
    const tela = document.getElementById('labrintotela');
    const conteudo = tela.getContext('2d');
    
    const tamanho = 30;
    let gameOver = false;
    let comecarTempo = null;
    let timerIntervalo;
    let TimerCorrendo = false;
    let PassouAzul = false; 
    let Labirinto;

    const Niveis = [
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

    
    function comecarLevel(y) {
        Labirinto = Niveis[y];
        gameOver = false;
        blueHovered = false;
        timerRunning = false;
        clearInterval(timerInterval);
        comecarTempo = null;
        document.getElementById('timer').textContent = 'Tempo: 0s';
        render();
        tela.addEventListener("mousemove", mouseMoveHandler);
    }

    const startButton = document.getElementById('Start');
    startButton.addEventListener('click', () => {
        currentLevel = 0; // Start from level 0
        initLevel(currentLevel);
    });

    function mouseMoveHandler(event) {
        if (!gameOver) {
            const rect = tela.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            checkCollisionWithMouse(mouseX, mouseY);
        }
    }

    function checkCollisionWithMouse(mouseX, mouseY) {
        const gridX = Math.floor(mouseX / tamanho);
        const gridY = Math.floor(mouseY / tamanho);

        // Start timer when the blue area (start) is hovered
        if (Labirinto[gridY] && Labirinto[gridY][gridX] === 3 && !timerRunning) {
            startTime = Date.now();
            timerInterval = setInterval(updateTimer, 1000);
            timerRunning = true;
            PassouAzul = true;
        }

        // Stop the timer when green area (finish) is reached
        if (PassouAzul && Labirinto[gridY] && Labirinto[gridY][gridX] === 2) {
            clearInterval(timerInterval);
            timerRunning = false;
            alert("Você venceu! Tempo: " + document.getElementById('timer').textContent);
            gameOver = true;
            tela.removeEventListener("mousemove", mouseMoveHandler);
        }

        // Stop the game if the player hits a wall
        if (Labirinto[gridY] && Labirinto[gridY][gridX] && PassouAzul === 1) {
            clearInterval(timerInterval);
            timerRunning = false;
            alert("Você perdeu! Você bateu na parede.");
            gameOver = true;
            tela.removeEventListener("mousemove", mouseMoveHandler);
        }
    }

    function updateTimer() {
        if (startTime && !gameOver) {
            const currentTime = Date.now();
            const elapsedTime = Math.floor((currentTime - startTime) / 1000);
            document.getElementById('timer').textContent = `Tempo: ${elapsedTime}s`;
        }
    }

    function render() {
        conteudo.clearRect(0, 0, tela.width, tela.height);
        drawLabirinto();
    }

    function drawLabirinto() {
        for (let linha = 0; linha < Labirinto.length; linha++) {
            for (let coluna = 0; coluna < Labirinto[linha].length; coluna++) {
                if (Labirinto[linha][coluna] === 1) {
                    conteudo.fillStyle = 'black'; // Wall
                    conteudo.fillRect(coluna * tamanho, linha * tamanho, tamanho, tamanho);
                } else if (Labirinto[linha][coluna] === 0) {
                    conteudo.fillStyle = 'white'; // Empty space
                    conteudo.fillRect(coluna * tamanho, linha * tamanho, tamanho, tamanho);
                } else if (Labirinto[linha][coluna] === 2) {
                    conteudo.fillStyle = 'green'; // Finish
                    conteudo.fillRect(coluna * tamanho, linha * tamanho, tamanho, tamanho);
                } else if (Labirinto[linha][coluna] === 3) {
                    conteudo.fillStyle = 'blue'; // Start point
                    conteudo.fillRect(coluna * tamanho, linha * tamanho, tamanho, tamanho);
                }
            }
        }
    }

    // Initial setup
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    timerDisplay.textContent = 'Tempo: 0s';
    document.querySelector('.container').appendChild(timerDisplay);
});
