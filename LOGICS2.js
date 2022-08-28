const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})

var grid = [null, null, null,
            null, null, null,
            null, null, null]
// building the grid for the game

var spot = null
var turn = true
var winner = null

function drawGrid() {
    console.table(grid)
} // displays the grid

function checkWinOrDraw() {
    if (grid[0] == grid[1] && grid[1] == grid[2]) {
        return 1
    }
    else if (grid[3] == grid[4] && grid[4] == grid[5]) {
        return 1
    }
    else if (grid[6] == grid[7] && grid[7] == grid[8]) {
        return 1
    }
    else if (grid[0] == grid[3] && grid[3] == grid[6]) {
        return 1
    }
    else if (grid[1] == grid[4] && grid[4] == grid[7]) {
        return 1
    }
    else if (grid[2] == grid[5] && grid[5] == grid[8]) {
        return 1
    }
    else if (grid[0] == grid[4] && grid[4] == grid[8]) {
        return 1
    }
    else if (grid[2] == grid[4] && grid[4] == grid[6]) {
        return 1
    }
    for (let i = 1; i < grid.length; i++) {
        const element = grid[i]
        if (typeof(element) == "null") {
            return 0
        }
    }
    return 2
} // checking for row/column wins and draws!

do {
    drawGrid()

    do {
        readline.question("Pick a number on the grid [1-9]:", function(answer) {
        spot = parseInt(answer) // turns your answer (that is a string) into an integer
        readline.close()
        })
        if (typeof(spot) == "number" && (spot > 9 || spot < 1)) {
            console.log("Number is greater than 9, or less than 1.")
            spot = null
        }
        // instead of forEach use every, so we can break out of the loop when we no longer need it.
        grid.every(element => {
            if (grid[spot - 1] == 0 || grid[spot - 1] == 1) {
                console.log("That spot is already taken!")
                spot = null
            }
        })
    } while (isNaN(spot)) // etc. answer = "a". a is NotaNumber! isNan detects this and makes the user answer again until answer is a number
    // this asks the 1st player for a number until they give a valid number
    spot -= 1 // same as spot = spot - 1
    grid[spot] = turn
    turn = !turn
} while (!checkWinOrDraw)
