// Module to hold gameboard
const gameBoard = (() => {
    const board = ["120", "1", "52", "3", "4", "5", "6", "7", "8"];

    return {board}

})();


// Module to display gameboard and it`s contents
const displayController = (() => {

    let boardIndex = 0;

    const displayBoard = () => gameBoard.board.forEach(el => {
        document.querySelector('.board').innerHTML += `<div class=field data-index=${boardIndex}>${el}</div>`;
        boardIndex++;
    })

    return {displayBoard}

})();

displayController.displayBoard()