function Gameboard() {

  const board = Array(9).fill(null);

    //return { board };
    function placeSymbol(position, symbol) {
        if (board[position] === null) {
            board[position] = symbol;
            return true;
        } else {
            return false;   
        }
    }


    //draw board in console
    function printBoard(board) {
    //if the cell is null, display the index, otherwise display the symbol
    const display = board.map((cell, index) =>
        cell === null ? index : cell
    );

    console.log(`
        ${display[0]} | ${display[1]} | ${display[2]}
        ---------
        ${display[3]} | ${display[4]} | ${display[5]}
        ---------
        ${display[6]} | ${display[7]} | ${display[8]}
        `);
    }

    return { board, placeSymbol, printBoard };
}


function ScreenController() {
    const game = Game();

    const boardDiv = document.getElementById("board");

    function render() {
    const board = game.getBoard();
    const buttons = boardDiv.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.textContent = board[index] ?? "";
    });
}

    boardDiv.addEventListener("click", function (event) {
        const index = event.target.dataset.index;
        if (index === undefined) return;

        game.playRound(Number(index));
        render();
    });
}


function Player(name, symbol) {
    return { name, symbol };
}

function Game() {
    const gameboard = Gameboard();
    gameboard.printBoard(gameboard.board);
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer = player1;
    let gameOver = false;

    const winningCombinations = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal
        [2, 4, 6]  // diagonal
        ];
            


     function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }


    function playRound(index) {  
        if (gameOver) return;      
        console.log(index, currentPlayer);
        const validMove = gameboard.placeSymbol(index, currentPlayer.symbol);

        if (validMove) {
            console.log(`${currentPlayer.name} placed ${currentPlayer.symbol} at position ${index}`);
            gameboard.printBoard(gameboard.board);

            for (const combination of winningCombinations) {
                const [a, b, c] = combination;
                if (gameboard.board[a] !== null && 
                    gameboard.board[a] === gameboard.board[b] && 
                    gameboard.board[a] === gameboard.board[c]) {
                    console.log(`${currentPlayer.name} wins!`);
                    gameOver = true;
                    return;
                }
            }
            switchPlayer();

        } else {
            console.log("Invalid move, try again."); 
            return;
        }
    }

   function getBoard() {
    return gameboard.board;
}

    return { playRound, getBoard };
}
ScreenController();