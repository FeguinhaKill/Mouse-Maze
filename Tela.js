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
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const tamanho = 30;
    let gameOver = false;
    let startTime = null;
    let timerInterval;

    // Variables to track the game state
    let timerRunning = false;

    tela.addEventListener("mousemove", (event) => {
        if (!gameOver) {
            const rect = tela.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            checkCollisionWithMouse(mouseX, mouseY);
        }
    });

    function checkCollisionWithMouse(mouseX, mouseY) {
        const gridX = Math.floor(mouseX / tamanho);
        const gridY = Math.floor(mouseY / tamanho);

        // Start the timer when the mouse hovers over the blue area
        if (Labirinto[gridY] && Labirinto[gridY][gridX] === 3 && !timerRunning) {
            // Start the timer only if it's not already running
            startTime = Date.now();
            timerInterval = setInterval(updateTimer, 1000); // Update every second
            timerRunning = true; // Set the flag that the timer is running
        }

        // Stop the timer when the mouse hovers over the green area
        if (Labirinto[gridY] && Labirinto[gridY][gridX] === 2) {
            clearInterval(timerInterval); // Stop the timer
            timerRunning = false; // Reset timer state
            alert("Você venceu! Tempo: " + document.getElementById('timer').textContent);
            gameOver = true; // Mark game as over
        }

        // Stop the timer if the mouse hits the wall (black area)
        if (Labirinto[gridY] && Labirinto[gridY][gridX] === 1) {
            clearInterval(timerInterval); // Stop the timer
            timerRunning = false;
            alert("Você perdeu! Você bateu na parede.");
            gameOver = true; // Mark game as over
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

    // Add a div to display the timer
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    timerDisplay.textContent = 'Tempo: 0s';
    document.querySelector('.container').appendChild(timerDisplay);

    render();
});
