document.addEventListener("DOMContentLoaded", function() {
    const tela = document.getElementById('labrintotela');
    const conteudo = tela.getContext('2d');

    let Labirinto = [
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
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const tamanho = 30;
    let gameOver = false;
    let timerInterval;
    let startTime;

    tela.addEventListener("mousemove", (event) => {
        if (!gameOver) {
            const rect = tela.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            checkCollisionWithMouse(mouseX, mouseY);
        }
    });

    document.getElementById('Start').addEventListener('click', () => {
        gameOver = false;
        startTime = null; // Reset timer state
        clearInterval(timerInterval); // Clear any existing interval
        render();
        document.getElementById('timer').textContent = "Tempo: 0s"; // Reset timer display
    });

    function render() {
        conteudo.clearRect(0, 0, tela.width, tela.height);
        drawLabirinto();
    }

    function checkCollisionWithMouse(mouseX, mouseY) {
        const gridX = Math.floor(mouseX / tamanho);
        const gridY = Math.floor(mouseY / tamanho);

        if (Labirinto[gridY] && Labirinto[gridY][gridX] === 1) {
            gameOver = true;
            clearInterval(timerInterval); // Stop the timer
            alert("Você perdeu! Você bateu na parede.");
        } else if (Labirinto[gridY] && Labirinto[gridY][gridX] === 2) {
            gameOver = true;
            clearInterval(timerInterval); // Stop the timer
            alert("Você venceu!");
            window.location.href = "level2.html";
        } else if (Labirinto[gridY] && Labirinto[gridY][gridX] === 3) {
            // Mouse is over the blue area
            if (!startTime) {
                // Start the timer only if it's not already running
                startTime = Date.now();
                timerInterval = setInterval(updateTimer, 1000); // Update every second
            }
        } else {
            // Mouse is not over the blue area, stop the timer
            clearInterval(timerInterval);
            startTime = null;
            render(); // Refresh the canvas
        }
    }

    function updateTimer() {
        if (startTime && !gameOver) {
            const currentTime = Date.now();
            const elapsedTime = Math.floor((currentTime - startTime) / 1000);
            document.getElementById('timer').textContent = `Tempo: ${elapsedTime}s`;
        }
    }

    function drawLabirinto() {
        for (let linha = 0; linha < Labirinto.length; linha++) {
            for (let coluna = 0; coluna < Labirinto[linha].length; coluna++) {
                if (Labirinto[linha][coluna] == 1) {
                    conteudo.fillStyle = 'black';
                    conteudo.fillRect(coluna * tamanho, linha * tamanho, tamanho, tamanho);
                } else if (Labirinto[linha][coluna] == 0) {
                    conteudo.fillStyle = 'white';
                    conteudo.fillRect(coluna * tamanho, linha * tamanho, tamanho, tamanho);
                } else if (Labirinto[linha][coluna] == 2) {
                    conteudo.fillStyle = 'green';
                    conteudo.fillRect(coluna * tamanho, linha * tamanho, tamanho, tamanho);
                } else if (Labirinto[linha][coluna] == 3) {
                    conteudo.fillStyle = 'blue';
                    conteudo.fillRect(coluna * tamanho, linha * tamanho, tamanho, tamanho);
                }
            }
        }
    }

    // Add a div to your HTML to display the timer
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    timerDisplay.textContent = 'Tempo: 0s';
    document.querySelector('.container').appendChild(timerDisplay);

    render();
});
