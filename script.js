function Gameboard() {
	const board = Array(9).fill(null);

	function placeSymbol(position, symbol) {
		if (board[position] === null) {
			board[position] = symbol;
			return true;
		} else {
			return false;
		}
	}

	// draw board in console
	function printBoard(board) {
		// if the cell is null, display the index, otherwise display the symbol
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
	let game = null;

	const boardDiv = document.getElementById("board");
	const statusDiv = document.getElementById("status");
	const setupDiv = document.getElementById("setup");
	const startButton = document.getElementById("startGame");
	const player1Input = document.getElementById("player1Name");
	const player2Input = document.getElementById("player2Name");
    const resetDiv = document.getElementById("reset");
    const resetButton = document.getElementById("resetGame");

	function render() {
		const board = game.getBoard();
		const buttons = boardDiv.querySelectorAll("button");

		buttons.forEach((button, index) => {
			button.textContent = board[index] ?? "";

			
		});

        if (game.getWinner()) {
				statusDiv.textContent = `${game.getWinner().name} wins!`;
			}
			else if (game.isGameOver()) {
				statusDiv.textContent = "It's a draw!";
			}
			else {
				const currentPlayer = game.getCurrentPlayer();
				statusDiv.textContent = `${currentPlayer.name}'s turn`;
			}
            
	}

    startButton.addEventListener("click", function () {
        const name1 = player1Input.value || "Player 1";
        const name2 = player2Input.value || "Player 2";

        game = Game(name1, name2);

        document.getElementById("game").style.display = "block";
        resetDiv.style.display = "block";  
        setupDiv.style.display = "none";

        render();
    });

	boardDiv.addEventListener("click", function (event) {
        if (!game) return;
		const index = event.target.dataset.index;
		if (index === undefined) return;

		game.playRound(Number(index));
		render();
	});

    resetButton.addEventListener("click", function () {
        const name1 = player1Input.value || "Player 1";
        const name2 = player2Input.value || "Player 2";

        game = Game(name1, name2);
        
        render();
    });


}


function Player(name, symbol) {
	return { name, symbol };
}


function Game(name1 = "Player 1", name2 = "Player 2") {
	const gameboard = Gameboard();

	gameboard.printBoard(gameboard.board);

	const player1 = Player(name1, 'X');
	const player2 = Player(name2, 'O');

	// Initialize game state
	let currentPlayer = player1;
	let gameOver = false;
	let winner = null;

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

		// Check for draw condition
		const isBoardFull = gameboard.board.every(cell => cell !== null);

		if (isBoardFull) {
			gameOver = true;
			return;
		}

		if (validMove) {
			console.log(`${currentPlayer.name} placed ${currentPlayer.symbol} at position ${index}`);
			gameboard.printBoard(gameboard.board);

			for (const combination of winningCombinations) {
				const [a, b, c] = combination;

				if (
					gameboard.board[a] !== null &&
					gameboard.board[a] === gameboard.board[b] &&
					gameboard.board[a] === gameboard.board[c]
				) {
					winner = currentPlayer;
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

	function getCurrentPlayer() {
		return currentPlayer;
	}

	function isGameOver() {
		return gameOver;
	}

	function getWinner() {
		return winner;
	}

    

	return { playRound, getBoard, getCurrentPlayer, isGameOver, getWinner };
}

ScreenController();
