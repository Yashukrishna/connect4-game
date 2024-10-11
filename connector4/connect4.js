var playerCoral = "C"; 
var playerBlue = "B"; 
var currPlayer = playerCoral; 

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; // Keeps track of which row each column is at.

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JavaScript Board Initialization
            row.push(' ');
            // HTML Tile Creation
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    // Get coordinates of the tile clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // Determine the available row in the clicked column
    r = currColumns[c]; 

    if (r < 0) { // If column is full
        return;
    }

    // Set piece on the board and update HTML tile
    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerCoral) {
        tile.classList.add("coral-piece");
        currPlayer = playerBlue; // Switch to playerBlue
    } else {
        tile.classList.add("blue-piece");
        currPlayer = playerCoral; // Switch to playerCoral
    }

    // Update row height for the column
    currColumns[c] = r - 1;

    // Check for a winner
    checkWinner();
}

function checkWinner() {
    const directions = [
        { x: 1, y: 0 },   // Horizontal
        { x: 0, y: 1 },   // Vertical
        { x: 1, y: 1 },   // Diagonal (down-right)
        { x: 1, y: -1 }   // Diagonal (up-right)
    ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] != ' ') {
                for (let dir of directions) {
                    if (checkDirection(r, c, dir.x, dir.y)) {
                        setWinner(r, c);
                        return;
                    }
                }
            }
        }
    }
}

function checkDirection(startRow, startCol, deltaRow, deltaCol) {
    const player = board[startRow][startCol];
    for (let i = 1; i < 4; i++) {
        const newRow = startRow + deltaRow * i;
        const newCol = startCol + deltaCol * i;
        if (
            newRow < 0 || newRow >= rows ||
            newCol < 0 || newCol >= columns ||
            board[newRow][newCol] != player
        ) {
            return false;
        }
    }
    return true;
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerCoral) {
        winner.innerText = "Congratulations! Light Coral Wins 🎉 Well done!";
        alert("Game Over! Congratulations! Coral Wins!");
    } else {
        winner.innerText = "Congratulations! Light Blue Wins 🎉 Keep it up!";
        alert("Game Over! Congratulations! Blue Wins!");
    }
    gameOver = true;
}
