document.addEventListener("DOMContentLoaded", () => {
    const options = document.getElementById("game-options");
    const board = document.getElementById("game-board");
    const currentPlayerIndicator = document.getElementById("current-player");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let againstAI = false;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (gameBoard[index] === "" && !isGameOver()) {
            gameBoard[index] = currentPlayer;
            event.target.innerText = currentPlayer;

            if (isWinner()) {
                alert(`Player ${currentPlayer} wins!`);
                resetGame();
            } else if (isBoardFull()) {
                alert("It's a draw!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                updateCurrentPlayerIndicator();

                if (againstAI && currentPlayer === "O") {
                    makeAIMove();
                }
            }
        }
    }

    function makeAIMove() {
        const emptyCells = gameBoard.reduce((acc, value, index) => {
            if (value === "") {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const aiMove = emptyCells[randomIndex];

        gameBoard[aiMove] = currentPlayer;
        const aiCell = document.querySelector(`.cell[data-index="${aiMove}"]`);
        aiCell.innerText = currentPlayer;

        if (isWinner()) {
            setTimeout(() => {
                alert(`Player ${currentPlayer} wins the game!`);
                resetGame();
            }, 100);
        } else if (isBoardFull()) {
            setTimeout(() => {
                alert("It's a draw!");
                resetGame();
            }, 100);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateCurrentPlayerIndicator();
        }
    }

    function isWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return (
                gameBoard[a] &&
                gameBoard[a] === gameBoard[b] &&
                gameBoard[a] === gameBoard[c]
            );
        });
    }

    function isBoardFull() {
        return gameBoard.every(cell => cell !== "");
    }

    function isGameOver() {
        return isWinner() || isBoardFull();
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        updateCurrentPlayerIndicator();
        resetBoard();

        if (againstAI && currentPlayer === "O") {
            makeAIMove();
        }
    }
    function resetBoard() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.innerText = "";
        });
    }
    function updateCurrentPlayerIndicator() {
        currentPlayerIndicator.textContent = `Current Player: ${currentPlayer}`;
    }
    function playAgainstFriend() {
        againstAI = false;
        options.style.display = "none";
        resetGame();
    }
    function playAgainstAI() {
        againstAI = true;
        options.style.display = "none";
        resetGame();
        if (againstAI && currentPlayer === "O") {
            makeAIMove();
        }
    }
    const friendButton = document.getElementById("play-with-friend");
    friendButton.addEventListener("click", playAgainstFriend);

    const aiButton = document.getElementById("play-with-ai");
    aiButton.addEventListener("click", playAgainstAI);
});
