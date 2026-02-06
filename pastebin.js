
function Player(name, symbol) {
    return name, symbol;
}


function Game() {
    const gameboard = Gameboard();
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer = player1;

    function switchPlayer() {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }

    function makeMove(position) {
        if (gameboard.board[position] === '') {
            gameboard.board[position] = currentPlayer.symbol;
            switchPlayer();
        }
    }

    return makeMove;
}

const game = Game();
game(0);