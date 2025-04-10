const tela = document.getElementById('labrintotela');
const conteudo = tela.getContext('2d');

let Labirinto = [
    [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1],
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
let jogador = {x:6, y:19};
const tamanho = 30;

canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect(); // Get canvas position
    const mouseX = event.clientX - rect.left;    // X-coordinate relative to canvas
    const mouseY = event.clientY - rect.top;     // Y-coordinate relative to canvas

    movePlayerToMouse(mouseX, mouseY); // Move player based on mouse position
});
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawMaze(); // Draw the maze
    drawPlayer(); // Draw the player (mouse image)
}

function movePlayerToMouse(mouseX, mouseY) {
    const gridX = Math.floor(mouseX / tileSize); // Map mouseX to grid cell
    const gridY = Math.floor(mouseY / tileSize); // Map mouseY to grid cell

    if (maze[gridY] && maze[gridY][gridX] === 0) { // Check if the cell is walkable
        player.x = gridX;
        player.y = gridY;
        render(); // Redraw the canvas with the updated position
    }
}

// Função para desenhar o labirinto
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

// Inicia o jogo
drawLabirinto();
