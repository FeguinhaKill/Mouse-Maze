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

            const tamanho = 30;
            let gameOver = false;

            // Player position is now based on the mouse position
            tela.addEventListener("mousemove", (event) => {
                if (!gameOver) {
                    const rect = tela.getBoundingClientRect();
                    const mouseX = event.clientX - rect.left;
                    const mouseY = event.clientY - rect.top;
                    movePlayerToMouse(mouseX, mouseY);
                }
            });

            function render() {
                conteudo.clearRect(0, 0, tela.width, tela.height);
                drawLabirinto();
                drawPlayer();
            }

            function movePlayerToMouse(mouseX, mouseY) {
                const gridX = Math.floor(mouseX / tamanho);
                const gridY = Math.floor(mouseY / tamanho);

                if (Labirinto[gridY] && Labirinto[gridY][gridX] === 1) {
                    // If player hits a wall (1), game over
                    gameOver = true;
                    alert("Você perdeu! Você bateu na parede.");
                } else {
                    render(); // Move the player to the new position
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
                const mouseX = event.clientX - tela.getBoundingClientRect().left;
                const mouseY = event.clientY - tela.getBoundingClientRect().top;
                conteudo.fillStyle = 'red';
                conteudo.fillRect(mouseX - (mouseX % tamanho), mouseY - (mouseY % tamanho), tamanho, tamanho);
            }

            // Initial render
            render();
        });
