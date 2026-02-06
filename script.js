function Gameboard() {
    const rows = 3;
    const cols = 3;

  const board = Array(9).fill(null);

    return { board };

}

const gameboard = Gameboard();

console.log(gameboard.board);

function printBoard(board) {
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


function Player(name, symbol) {
    return { name, symbol };
}

function Game() {
    const gameboard = Gameboard();
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
}
