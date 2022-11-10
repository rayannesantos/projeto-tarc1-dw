const game = (function() {
    const wrapper = document.getElementById("game-wrapper");
    //quantidade de linhas e colunas
    const row = 4;
    const col = 4;
    const cellWidth = wrapper.offsetWidth / col;
    const cellHeight = wrapper.offsetHeight / row;


    //array com caminho das imagens
    const symbols = ['img/DW-01.jpg' , 'img/DW-02.jpg', 'img/DW-03.jpg' , 'img/DW-04.jpg','img/DW-05.jpg','img/DW-06.jpg','img/DW-07.jpg',
                     'img/DW-08.jpg','img/DW-09.jpg','img/DW-10.jpg','img/DW-11.jpg','img/DW-12.jpg','img/DW-13.jpg','img/DW-war.jpg']

    const cells = [];
    let previousCellIndex = null; // index do ultimo card clicado
    let canPlay = false; 

    // cria a grid
    const grid = document.createElement("div");
    grid.classList.add("grid");
    wrapper.appendChild(grid);

    //cria o painel de informação
    const infoPanel = document.createElement("div");
    infoPanel.classList.add("info-panel");
    wrapper.appendChild(infoPanel);

    // cria os cards
    for (let i = 0; i < row*col; i+=2) {
        const symbol = randomSymbol();
        console.log(symbol)
        
        for (let j = 0; j < 2; j++) {
            const currentCellIndex = i + j;
            const cellElement = document.createElement("div");
            const name = "<img src='"+symbol+"' style='width:100%;' >";

            // cellElement.ine('<img src="'+ symbol +'" >'  )
            // cellElement.innerText = symbol;
            cellElement.innerHTML = name;
            cellElement.classList.add("cell");
            cellElement.style.width = (100 / col) + "%"
            
            const cell = {
                symbol: symbol,
                element: cellElement,
                hasMatch: false
            }

            // cards virados pra baixo - escondidoss
            setTimeout(() => {
                cellElement.classList.add("hide");
            }, randomInt(300, 350));


            if(currentCellIndex > 2) {
                const previousRandIndex = randomInt(0, i);

                cells[currentCellIndex] = cells[previousRandIndex];
                cells[previousRandIndex] = cell;

            } else {
                cells[currentCellIndex] = cell;
            }
        }
    }

    // adiciona os elementos no documento
    for (let i = 0; i < cells.length; i++) {
        cells[i].element.addEventListener("click", () => { cellClick(i) }); //adiciona o click nos cards

        grid.appendChild(cells[i].element);
        canPlay = true; // depois de tudo adicionado é permitido jjogar
    }

    function randomSymbol(){
        const symbolIndex = randomInt(0, symbols.length-1);
        const symbol = symbols[symbolIndex];

        // deleta symbol de symbols
        symbols.splice(symbolIndex, 1);
        return symbol;
    }

    function randomInt(min, max){
        return Math.round(Math.random() * (max - min)) + min;
    }

    function cellClick(cellIndex) {
        const cellElement = cells[cellIndex].element;

        if(canPlay && cellElement.classList.contains("hide")) {
            canPlay = false;
            cellElement.classList.remove("hide");

            if(previousCellIndex === null) {
                //primeiro click
                previousCellIndex = cellIndex;
                canPlay = true
            } else {
                // segundo click e verifica se são iguais

                if(cells[previousCellIndex].symbol === cells[cellIndex].symbol) {
                    // IGUAIS
                    cells[previousCellIndex].hasMatch = true;
                    cells[cellIndex].hasMatch = true;

                    showInfo("CERTO", 'green');

                    setTimeout(() => {
                        previousCellIndex = null;

                        const gameOver = checkGameOver();
                        if(gameOver) {
                            showInfo("FIM", 'WHITE');
                        } else {
                            canPlay = true;
                        }
                    }, 500);
                } else {
                    // DIFERENTES
                    showInfo("ERRADO!", "red");

                    setTimeout(() => {
                        // esconde as imagens quando nao são iguais
                        cells[previousCellIndex].element.classList.add("hide");
                        cellElement.classList.add("hide");

                        previousCellIndex = null;
                        canPlay = true;
                    }, 500);
                }
            }
        }
    }

    // mostra infos
    function showInfo(message, type){
        infoPanel.innerHTML = `<span class="${type}">${message}</span>`;
    }

    // checa se finalizou
    function checkGameOver() {
        let gameIsOver = true;

        for (let i = 0; i < cells.length; i++) {
            gameIsOver = cells[i].hasMatch === false ? false : gameIsOver;
        }

        return gameIsOver;
    }
})();