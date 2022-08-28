const prompt = require("prompt-sync")()

var grid = [
    [NaN, NaN, NaN],
    [NaN, NaN, NaN],
    [NaN, NaN, NaN]
] // builds our grid

let turn = true

function checkWinOrDraw() {
    // horizontal win states
    if (grid[0][0] == grid[0][1] && grid[0][1] == grid[0][2]) {
        return 1
    }
    else if (grid[1][0] == grid[1][1] && grid[1][1] == grid[1][2]) {
        return 1
    }
    else if (grid[2][0] == grid[2][1] && grid[2][1] == grid[2][2]) {
        return 1
    }
    // vertical win states
    else if (grid[0][0] == grid[1][0] && grid[1][0] == grid[2][0]) {
        return 1
    }
    else if (grid[0][1] == grid[1][1] && grid[1][1] == grid[2][1]) {
        return 1
    }
    else if (grid[0][2] == grid[1][2] && grid[1][2] == grid[2][2]) {
        return 1
    }
    //diagonal win states
    else if (grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]) {
        return 1
    }
    else if (grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0]) {
        return 1 // win
    }
    for (const row of grid) { // [for i in x:] but java version
        for (const element of row) { 
            if (isNaN(element)) {
                return 0 // end
            }
        }
    } // goes thru all elements in all the rows of in all the grids
    return 2 // draw
}

function getInput() {
    var answer = parseInt(prompt("Pick a number 1-9:")) //input is automatically turned into a integer

    while (isNaN(answer)) { // forces player to keep answering until answer is a number
        answer = parseInt(prompt())
        if (answer > 9 || answer < 1) {
            console.log("The number is over 9 or under 1.") // checks if number is not on the grid
            answer = NaN
            continue // after fulfilled, move on
        }
        if (!isNaN(grid[answer])) { // checks if number has already been said
            console.log("That spot is already taken!") 
            answer = NaN // triggers loop to keep going as answer is now NaN
            continue
        }
    }

    answer -= 1
    if (answer >= 0 && answer <= 2) { grid[0][answer] = turn } // first row
    else if (answer >= 3 && answer <= 5) { grid[1][answer - 3] = turn } // second row [if user input 4, you would be on the 1st element of the 2nd row, which is why we take away 3]
    else if (answer >= 6 && answer <= 8) { grid[2][answer - 6] = turn } // third row [same as above, if user input 9, it would the 3rd element of the 3rd row, so we need to remove 6]
}

function startGame() {
    while (checkWinOrDraw() == 0) { //the game can still be played
        console.table(grid) //shows grid
        getInput() // gets players input

        turn = !turn // switches turn to other player
    }

    console.table(grid) // displays the grid with all changes
}
console.log("Game has started!")
startGame() // starts the game!
if (startGame() == false){
    console.log("Game has ended!")
}