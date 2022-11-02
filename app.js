// Module to hold gameboard
const gameBoard = (() => {
    const board = [];

    for (i = 0; i < 9; i++) {
        board.push('');
    }

    const aPlayer = (user, mark, turn ) => {
        return {user, mark, turn} 
    }


    const player1 = aPlayer('user1', 'X', true);
    const player2 = aPlayer('user2', 'O', false);

    let winner = null;
    
    let turns = 0;

    // Winning combinations
    const winCombos = [
            [0,1,2],
            [0,3,6],
            [3,4,5],
            [6,7,8],
            [1,4,7],
            [2,4,6],
            [2,5,8],
            [0,4,8]
        ];
        
    return {  
                board,
                player1,
                player2,
                winner,
                turns,
                winCombos,
            };
    })();


// Module to display gameboard and it`s contents
const displayController = (() => {

    let boardIndex = 0;

    const displayBoard = () => gameBoard.board.forEach(el => {
        document.querySelector('.board').innerHTML += `<div class=field data-index=${boardIndex}>${el}</div>`;
        boardIndex++;
    })

    return {displayBoard};

})();


function playerTruns() {

    const cell = document.querySelectorAll('.field');

    cell.forEach((elem, index) => {
        elem.addEventListener('click', () => {
    
            if(gameBoard.player1.turn == true) {
    
                gameBoard.board[index] = gameBoard.player1.mark;
                elem.textContent = gameBoard.player1.mark;
    
                gameBoard.player1.turn = false;
                gameBoard.player2.turn = true;
                gameWinCheck();
            
            } else if (gameBoard.player2.turn == true) {
                gameBoard.board[index] = gameBoard.player2.mark;
                elem.textContent = gameBoard.player2.mark
    
                gameBoard.player1.turn = true;
                gameBoard.player2.turn = false;
                gameWinCheck();
            }
    
            // Make cell unclickabale after one click 
            if (cell[index].innerHTML != '') {
                cell[index].style.pointerEvents = 'none';
            }
            
        })
    })
    
}

playerTruns();


function gameWinCheck() {

    const displayWin = document.querySelector('.displayWin');
    const bDisplay = document.querySelector('.board');

    gameBoard.winCombos.forEach((combo, index) => {
        
        let a = gameBoard.board[combo[0]];
        let b = gameBoard.board[combo[1]];
        let c = gameBoard.board[combo[2]];

        if (a != '' && a == b && b == c) {
            if (a == 'X') {
               
               displayWin.textContent = `${a} player - Wins!`;
               bDisplay.style.pointerEvents = 'none';

            } else {

                displayWin.textContent = `${a} player - Wins!`;
                bDisplay.style.pointerEvents = 'none';

            }
            
        }
    })

    if (!gameBoard.board.includes('')) {
        displayWin.textContent = 'It`s a tie';
    }

}

gameWinCheck();


const startButton = (() => {

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.querySelector('.restart');
    const displayWin = document.querySelector('.displayWin');
    
    startBtn.addEventListener('click', () => {
    
        displayController.displayBoard();
        playerTruns();
        gameWinCheck();
        startBtn.style.display = 'none';
        restartBtn.style.display = 'block';
        displayWin.style.display = 'block';
    })

})();


const resetbtn = (() => {

    const restartBtn = document.querySelector('.restart');
    restartBtn.addEventListener('click', () => {
        window.location.reload();
    })

})();

