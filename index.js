const spots = document.querySelectorAll(".spot");
const X_PLAYER = "X";
const O_PLAYER = "O";
let turn = X_PLAYER;
let restartButton = document.getElementById('restartButton')

const boardState = Array(spots.length);
boardState.fill(null);

// elements used in the game!
const strike = document.getElementById("strike");
const endDisplay = document.getElementById("end-display");
const winnerText = document.getElementById("winner-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);
 
spots.forEach((spot) => spot.addEventListener("click", spotClick));

function setHoverText(){
    // remove all hover text before showing new hover text
    spots.forEach((spot => {
        spot.classList.remove("x-hover")
        spot.classList.remove("o-hover")
    }));

    const hoverClass = `${turn.toLowerCase()}-hover`;

    spots.forEach(spot =>{
        if(spot.innerText == ""){
            spot.classList.add(hoverClass);
        }
    })
}

setHoverText();

function spotClick(event){
    if(endDisplay.classList.contains("visible")){
        return;
    }

    const spot = event.target;
    const spotNumber = spot.dataset.index;
    if(spot.innerText != ""){
        return;
    }

    if(turn === X_PLAYER){
    spot.innerText = X_PLAYER;
    boardState[spotNumber - 1] = X_PLAYER
    turn = O_PLAYER;
    }
    
    else{
    spot.innerText = O_PLAYER;
    boardState[spotNumber - 1] = O_PLAYER
    turn = X_PLAYER;
    }

    setHoverText();
    winnerCheck();
}

function winnerCheck() {
    for (const winState of winStates){
        console.log(winState)
        const {combo, strikeClass} = winState; // object destructuring;
        const spotValue1 = boardState[combo[0] - 1];
        const spotValue2 = boardState[combo[1] - 1];
        const spotValue3 = boardState[combo[2] - 1];

        if(spotValue1 != null && spotValue1 === spotValue2 && spotValue1 === spotValue3){
            strike.classList.add(strikeClass);
            endScreen(spotValue1);
            return;
        }
    }

    // draw state?
    const allSpotsTaken = boardState.every((spot) => spot !== null);
    if (allSpotsTaken){
        endScreen(null)
    }
}

function endScreen(winText){
    let text = "It's a tic tac tie!"
    if (winText != null){
        text = `${winText} has won!`;
    }
    endDisplay.className = "visible";
    winnerText.innerText = text;
}

function startNewGame(){
    strike.className = "strike";
    endDisplay.className = "hidden";
    boardState.fill(null);
    spots.forEach((spot) => (spot.innerText = ""));
    turn = X_PLAYER;
    setHoverText();
}

restartButton.addEventListener('click', restart)
function restart() {
    startNewGame()
}

const winStates = [
    // horizontal win states
    {combo: [1,2,3], strikeClass: "strike-r1"},
    {combo: [4,5,6], strikeClass: "strike-r2"},
    {combo: [7,8,9], strikeClass: "strike-r3"},
    // vertical win states
    {combo: [1,4,7], strikeClass: "strike-c1"},
    {combo: [2,5,8], strikeClass: "strike-c2"},
    {combo: [3,6,9], strikeClass: "strike-c3"},
    // diagonal win states
    {combo: [1,5,9], strikeClass: "strike-d1"},
    {combo: [3,5,7], strikeClass: "strike-d2"}
    ];