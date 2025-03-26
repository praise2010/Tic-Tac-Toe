// selects all the elements with class box
const boxEls = document.querySelectorAll('.box');

// selecting the element with the class of status
const statusEl = document.querySelector('.status');

// selecting the restart element button
const restartbtnEl = document.querySelector('.restartBtn');

// define the the x and the o images to be placed in the boxes
let x = "<img src='X-Player.png'>";
let o = "<img src='O-Player.png'>";

// defining all the possible winning combinations
const win = [
    [0, 1, 2], //top row 
    [3, 4, 5], //middle row
    [6, 7, 8], //bottom row
    [0, 3, 6], //left column
    [1, 4, 7], //middle column
    [2, 5, 8], //right column
    [0, 4, 8], // left diagonal
    [2, 4, 6]  // right diagonal
]

// initial game state where all of the boxes are empty
let options = ["", "", "", "", "", "", "", "", ""];

// initially x player starts 
let currentPlayer = x;
let player = "X";

// game running state
let running = false;

// initialise the game by setting event listener and updating status
init();

// function to initialise the game
function init() {
    // we are adding clickEvent to every box. when clicked the boxClicked function will be called
    boxEls.forEach(box => box.addEventListener('click', boxClick));

    // add our clickEvent to the restartbutton and cause the restart game when clicked
    restartbtnEl.addEventListener('click', restartGame);

    // set initial status messsage
    statusEl.textContent = `Now "${player}" Turn`;

    // set the game to running
    running = true;
}

//function to handle the box click events
function boxClick(e) {
    //getting the postion or the index of the clickedBox
    const index = e.target.dataset.index;
    //if the box is already filled or the game is not running then just return
    if (options[index] != "" || !running) {
        return;
    }

    //otherwise update the clickedBox
    updateBox(e.target, index);

    //check if the game has a winner after the move
    checkWinner();
}

//function to update a box with the current player symbol
function updateBox(box, index) {
    //storing the player's symbol in the options array
    options[index] = player;
    //updating the content of the box wih the coresponding image that is x or o
    box.innerHTML = currentPlayer;
}

//the function to switch the turn between x and o
function changePlayer() {

    //we have the toggle between x and o
    player = (player == 'X') ? "O" : "X";

    // toggle the corrosponding image
    currentPlayer = (currentPlayer == x) ? o : x;

    // updating the status messsage with the next player's turn
    statusEl.textContent = `Now "${player}" Turn`;

    //we are resetting the status color to deafult
    statusEl.style.color = "black";

}
// function to restart game
function restartGame() {
    //we are resetting all the boxes empty
    options = ["", "", "", "", "", "", "", "", ""];

    // resetting the player to x
    currentPlayer = x;
    player = "X";

    //we are restarting the game
    running = true;

    //we are resetting the status message 
    statusEl.textContent = `Now "${player}" Turn`;
    statusEl.style.color = "black";

    //resetting the restart button text
    restartbtnEl.textContent = "Restart 🔁";

    // clear all the box content and remove the win class
    boxEls.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('win');
    })
}

// function to check for a winner or a draw
function checkWinner() {
    let isWon = false;

    //iterate over all the winning combinations
    for (let i = 0; i < win.length; i++) {

        //getting the current winninng combination
        const condition=win[i];
        const box1=options[condition[0]];
        const box2=options[condition[1]];
        const box3=options[condition[2]];
        
        //if any box in this combination is empty then we will skip that particular box
        if(box1=="" || box2=="" || box3==""){
            continue;
        }

        // if all the 3 boxes match then its a win
        if (box1==box2 && box2==box3){
            isWon=true;

            //we are highlighting the winning boxes by adding the win class
            boxEls[condition[0]].classList.add('win');
            boxEls[condition[1]].classList.add('win');
            boxEls[condition[2]].classList.add('win');
        }
        
        
    }

    //if a player has won the match
    if(isWon){
        statusEl.textContent=`hurray...! "${player}" Won the game🥳🎉🪅`;
        statusEl.style.color="green";
        restartbtnEl.textContent="play again";
        running=false;
    }

    //if all the boxes are filled but no one has won it is a draw
    else if(!options.includes("")){
        statusEl.textContent=`oops...! game draw `;
        statusEl.style.color="red";
        restartbtnEl.textContent="play again";
        running=false;
    }

    //otherwise continue playing by switching turns
    else {
        changePlayer();
    }

}






