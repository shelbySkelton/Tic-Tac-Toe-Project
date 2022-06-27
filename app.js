let players, pidx, currentPlayer, gameBoard, winningVal, isThereAWinner, boardFull, catGame;

let playerDisplay, table, playerSelection, startButton, p1nameinput, p2nameinput, player2label, newGame, eachSquare;


function initialState () {
  
    players = ['p1', 'p2'];
    pidx = 0;
    currentPlayer = players[pidx];
    gameBoard= [[null, null, null], 
                    [null, null, null],
                    [null, null, null] ] ;

    winningVal = "";
    isThereAWinner = false;
    boardFull = false;
    catGame = false;

    playerDisplay = document.getElementById('player-display');
    table = document.getElementById('table')
    playerSelection = document.getElementById('cpu-or-player2')
    startButton = document.getElementById('start-button');
    p1nameinput = document.getElementById('p1nameinput');
    p2nameinput = document.getElementById('p2nameinput');
    p1namedisplay =  document.getElementById('p1namedisplay');
    p2namedisplay = document.getElementById('p2namedisplay');
    player1label = document.getElementById('player1label')
    player2label = document.getElementById("player2label");
    newGame = document.getElementById('new-game');
    eachSquare = document.getElementsByTagName('td');
    for (let i =0; i < (gameBoard.length*3); i++){
        eachSquare[i].innerHTML = null;
    }
    playerDisplay.innerHTML = "";
    p1namedisplay.innerHTML = "";
    p2namedisplay.innerHTML = "";
    player1label.hidden = false;
    player2label.hidden = false;
    p1nameinput.hidden = false;
    p2nameinput.hidden = false;
    


    startButton.addEventListener('click', renderState);
    table.addEventListener('click', onTableClick)
    newGame.addEventListener('click', initialState)
    playerSelection.addEventListener('change', cpuSelect)
    // table.addEventListener('click', computerMove)
 

}

window.addEventListener('load', initialState)


function displayName() {
    p1namedisplay.innerHTML = "Player 1:  " + p1nameinput.value + "  (X)";
    p2namedisplay.innerHTML = "Player 2:  " + p2nameinput.value + "  (O)" 
    p1nameinput.hidden = true;
    p2nameinput.hidden = true;
    player2label.hidden = true;
    player1label.hidden = true;
        if (playerSelection.value == "cpu") {
            p2namedisplay.innerHTML = "Player 2: Computer   (O)";  
        }
    playerDisplay.innerHTML = p1nameinput.value + "'s Turn";
}   

function cpuSelect() {
    if (playerSelection.value == "cpu") {
        p2nameinput.hidden = true;
        player2label.hidden= true;
        p2nameinput.value = "Computer";
    } 
}

function renderState() {

    displayName();
    cpuSelect();
}



function getRow (gameBoard, i) {
    return gameBoard[i]
}
function getColumn (gameBoard, i) {
    let column = [];
     for (let p = 0; p < gameBoard.length; p++) {
      let columnVals = (gameBoard[p][i]);
      column.push(columnVals);
    }
    return column;
}
function getDiag1 (gameBoard) {
    let diag1 = [];
    for (let i = 0; i < gameBoard.length; i++) {
      diag1.push(gameBoard[i][i])
    }
    return diag1;
} 
function getDiag2 (gameBoard) {
    let diag2 = [];
    for (let i = 0; i < gameBoard.length; i++) {
      diag2.push(gameBoard[i][-(i-2)])
    }
    return diag2;
}
function rowChecker (row) { 
    if (row[0] !== null && row[1] !== null && row[2] !== null) {
        if (row[0] == row[1] && row[1] == row[2]) {
            winningVal = row[0];
            return true;
        
        } else {
          return false;
        }
    }
}
function allRowsFull (gameBoard) {  
    let eachRow;
    for (let i = 0; i < gameBoard.length; i++) {
        eachRow = gameBoard[i];
            if (eachRow[0] == null || eachRow[1] == null || eachRow[2] == null) {
            boardFull = false;
            } else {
                boardFull = true;
                }
    }
}    
function boardChecker (gameBoard) {
    for (let i = 0; i < gameBoard.length; i++) {
        let isThereAWinningRow = rowChecker(getRow(gameBoard, i));
        let isThereAWinningColumn = rowChecker(getColumn(gameBoard, i));
        let isThereAWinningDiag = (rowChecker(getDiag1(gameBoard))) || (rowChecker(getDiag2(gameBoard)))
        if (isThereAWinningRow || isThereAWinningColumn || isThereAWinningDiag) {
            isThereAWinner = true;
            return whoWon();
        }
        if (allRowsFull(gameBoard)) {
            boardFull = true;
            }
        if (boardFull && !isThereAWinner) {
            catGame = true;
        }
    }  
    return whoWon();
}
function whoWon () {
    if (winningVal == "X") {
        playerDisplay.innerHTML = p1nameinput.value + " WON!!!!";
    } else if (winningVal == "O") {
        playerDisplay.innerHTML = p2nameinput.value + " WON!!!!";
    } else if (catGame) {
        playerDisplay.innerHTML = "IT'S A TIE!";
    }
}
function addMarker(event) {
    let clickedSquare = event.target;
    if (clickedSquare.innerHTML === "X" || clickedSquare.innerHTML === "O") {
        return;
    } 
    if (isThereAWinner == true) {
        return;
    } 
    if (currentPlayer == 'p1') {
        clickedSquare.innerHTML= "X";
    } else if (currentPlayer == 'p2') {
        clickedSquare.innerHTML = "O";
    } 
}

function updateTable(event) {
    let clickedSquare = event.target
    let gbidxX = clickedSquare.className[0];
    let gbidxY = clickedSquare.className[1];
    gameBoard[gbidxX][gbidxY] = clickedSquare.innerHTML;
}    
function switchPlayer () {
    pidx++;
    currentPlayer = players[pidx % 2];
    if (currentPlayer == 'p1') {
        playerDisplay.innerHTML = p1nameinput.value + "'s Turn";
    } else if (currentPlayer == 'p2') {
        playerDisplay.innerHTML = p2nameinput.value + "'s Turn";
    }
}


function onTableClick () {
    if (isThereAWinner) {
        return;
    }
    addMarker(event);
    updateTable(event);
    switchPlayer(); 
    computerMove();
    boardChecker(gameBoard);

}










let nullIndexArray;
function findNulls (gameBoard) {
    nullIndexArray = [];
    for (let i=0; i < gameBoard.length*3; i++) {
        if (eachSquare[i].innerHTML == "") {
            nullIndexArray.push(i);
        }
    }
    return nullIndexArray;
}
function randomMove (nullIndexArray) {

    randomIdx = Math.floor(Math.random() * nullIndexArray.length);
    randomNullIdx = nullIndexArray[randomIdx]
    eachSquare[randomNullIdx].innerHTML = "O";
    let gbIdxx = eachSquare[randomNullIdx].className[0];
    let gbIdxy = eachSquare[randomNullIdx].className[1];
    gameBoard[gbIdxx][gbIdxy] = "0"  
}
function computerMove () {
    if (isThereAWinner) {
        return;
    }
    boardChecker(gameBoard);
    if (playerSelection.value == 'cpu' && currentPlayer == 'p2') {
       randomMove(findNulls(gameBoard))
       switchPlayer();
    }
}




// was going to try to tackle a "Change Board Size" function but will have to leave that for now!




