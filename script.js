/*

 _________  ________  ______       _________  ________   ______       _________  ______   ______      
/________/\/_______/\/_____/\     /________/\/_______/\ /_____/\     /________/\/_____/\ /_____/\     
\__.::.__\/\__.::._\/\:::__\/     \__.::.__\/\::: _  \ \\:::__\/     \__.::.__\/\:::_ \ \\::::_\/_    
   \::\ \     \::\ \  \:\ \  __      \::\ \   \::(_)  \ \\:\ \  __      \::\ \   \:\ \ \ \\:\/___/\   
    \::\ \    _\::\ \__\:\ \/_/\      \::\ \   \:: __  \ \\:\ \/_/\      \::\ \   \:\ \ \ \\::___\/_  
     \::\ \  /__\::\__/\\:\_\ \ \      \::\ \   \:.\ \  \ \\:\_\ \ \      \::\ \   \:\_\ \ \\:\____/\ 
      \__\/  \________\/ \_____\/       \__\/    \__\/\__\/ \_____\/       \__\/    \_____\/ \_____\/ 
                                                                                                      
                                                         

-----------------------------------------------
  _____ _           ___     _ _        ___          _        _   
 |_   _| |_  ___   / _ \ __| (_)_ _   | _ \_ _ ___ (_)___ __| |_ 
   | | | ' \/ -_) | (_) / _` | | ' \  |  _/ '_/ _ \| / -_) _|  _|
   |_| |_||_\___|  \___/\__,_|_|_||_| |_| |_| \___// \___\__|\__|
                                                 |__/            ```

Project: Tic Tac Toe Game
Link to project brief: https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe
Author: Andrew Gunkel

*/

/*
================================
   GAMEBOARD MODULE
================================ 
*/

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


/* 
================================
   SCREEN CONTROLLER
================================ 
*/

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
			button.classList.remove("cell-disabled");
			button.classList.remove("cell-win");
		});

		const winner = game.getWinner();

		if (winner) {
			statusDiv.textContent = `${winner.name} wins!`;
		}
		else if (game.isGameOver()) {
			statusDiv.textContent = "It's a draw!";
		}
		else {
			const currentPlayer = game.getCurrentPlayer();
			statusDiv.textContent = `${currentPlayer.name}'s turn`;
		}

		if (winner) {
			const winningCells = game.getWinningCells();

			winningCells.forEach((index, i) => {
				setTimeout(() => {
					buttons[index].classList.add("cell-win");
				}, i * 200);
			});
		}

		if (game.isGameOver()) {
			buttons.forEach(button => {
				button.classList.add("cell-disabled");
			});
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


/* 
================================
   PLAYER FACTORY
================================ 
*/

function Player(name, symbol) {
	return { name, symbol };
}


/* 
================================
   GAME CONTROLLER
================================ 
*/

function Game(name1 = "Player 1", name2 = "Player 2") {
	const gameboard = Gameboard();

	gameboard.printBoard(gameboard.board);

	const player1 = Player(name1, "X");
	const player2 = Player(name2, "O");

	let currentPlayer = player1;
	let gameOver = false;
	let winner = null;
	let winningCells = null;

	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	function switchPlayer() {
		currentPlayer = currentPlayer === player1 ? player2 : player1;
	}

	function playRound(index) {
		if (gameOver) return;

		const validMove = gameboard.placeSymbol(index, currentPlayer.symbol);

		if (!validMove) {
			console.log("Invalid move, try again.");
			return;
		}

		for (const combination of winningCombinations) {
			const [a, b, c] = combination;

			if (
				gameboard.board[a] !== null &&
				gameboard.board[a] === gameboard.board[b] &&
				gameboard.board[a] === gameboard.board[c]
			) {
				winner = currentPlayer;
				winningCells = [a, b, c];
				gameOver = true;
				return;
			}
		}

		const isBoardFull = gameboard.board.every(cell => cell !== null);

		if (isBoardFull) {
			gameOver = true;
			return;
		}

		switchPlayer();
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

	function getWinningCells() {
		return winningCells;
	}

	return {
		playRound,
		getBoard,
		getCurrentPlayer,
		isGameOver,
		getWinner,
		getWinningCells
	};
}

ScreenController();
