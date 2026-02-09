function Gameboard() {

  const board = Array(9).fill(null);

    //return { board };
    function placeSymbol(position, symbol) {
        if (board[position] === null) {
            board[position] = symbol;
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




const gameboard = Gameboard();

gameboard.printBoard(gameboard.board);

//place symbol - gameboard.placeSymbol(0, 'X');
//print board - gameboard.printBoard(gameboard.board);

function Player(name, symbol) {
    return { name, symbol };
}

function Game() {
    const gameboard = Gameboard();
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
}
