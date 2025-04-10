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
    let jogador = {x: 6, y: 19};
    const tamanho = 30;

    tela.addEventListener("mousemove", (event) => {
        const rect = tela.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        movePlayerToMouse(mouseX, mouseY);
    });

    function render() {
        conteudo.clearRect(0, 0, tela.width, tela.height);
        drawLabirinto();
        drawPlayer();
    }

    function movePlayerToMouse(mouseX, mouseY) {
        const gridX = Math.floor(mouseX / tamanho);
        const gridY = Math.floor(mouseY / tamanho);

        if (Labirinto[gridY] && Labirinto[gridY][gridX] === 0) {
            jogador.x = gridX;
            jogador.y = gridY;
            render();
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

    function drawPlayer() {
        conteudo.fillStyle = 'red';
        conteudo.fillRect(jogador.x * tamanho, jogador.y * tamanho, tamanho, tamanho);
    }

    // Initial render
    render();
});
