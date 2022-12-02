const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const inputArray = syncReadFile('./Day 2/input.txt');

// LEGEND FOR THIS QUESTION:
// 'A' = Rock (Opponent), 'X' = Rock (Me)
// 'B' = Paper (Opponent), 'Y' = Paper (Me)
// 'C' = Scissors (Opponent), 'Z' = Scissors (Me)
//
// Shape Points: Rock = 1 point, Paper = 2 points, Scissors = 3 points
// Match Outcome Points: Win = 6 points, Draw = 3 points, Lose = 0 points

function solutionOne(data) {
    let totalPoints = 0;

    for (let i = 0; i < data.length; i++) {
            let opponentChoice = data[i][0];
            let myChoice = data[i][2];
            totalPoints += calculateScore(myChoice, opponentChoice);
        }

    return totalPoints;
};

function calculateScore(myChoice, opponentChoice) {
    let pointsWon = 0;

    switch (myChoice) {
        case 'X': // I choose ROCK
            if (opponentChoice == 'C') pointsWon = (1 + 6); // Opponent chooses SCISSORS; I choose ROCK; I WIN -> Shape Point (1) + Win (6)
            else if (opponentChoice == 'A') pointsWon = (1 + 3); // Opponent chooses ROCK; I choose ROCK; We DRAW -> Shape Point (1) + Draw (3)
            else pointsWon = (1 + 0); // Opponent chooses PAPER; I choose ROCK; I LOSE -> Shape Point (1) + Lose (0)
            break;
        case 'Y': // I choose PAPER
            if (opponentChoice == 'A') pointsWon = (2 + 6); // Opponent chooses ROCK; I choose PAPER; I WIN -> Shape Point (2) + Win (6)
            else if (opponentChoice == 'B') pointsWon = (2 + 3); // Opponent chooses PAPER; I choose PAPER; We DRAW -> Shape Point (2) + Draw (3)
            else pointsWon = (2 + 0); // Opponent chooses SCISSORS; I choose PAPER; I LOSE -> Shape Point (2) + Lose (0)
            break;
        case 'Z': // I choose SCISSORS
            if (opponentChoice == 'B') pointsWon = (3 + 6); // Opponent chooses PAPER; I choose SCISSORS; I WIN -> Shape Point (3) + Win (6)
            else if (opponentChoice == 'C') pointsWon = (3 + 3); // Opponent chooses SCISSORS; I choose SCISSORS; We DRAW -> Shape Point (3) + Draw (3)
            else pointsWon = (3 + 0); // Opponent chooses ROCK; I choose SCISSORS; I LOSE -> Shape Point (3) + Lose (0)
            break;
    }

    return pointsWon;
}

console.log(`Q1: The total score if everything goes exactly according to the strategy guide is ` + solutionOne(inputArray) + ` points!`);



function solutionTwo(data) {
    let totalPoints = 0;

    for (let i = 0; i < data.length; i++) {
            let opponentChoice = data[i][0];
            let matchOutcome = data[i][2];
            totalPoints += calculateNewScore(opponentChoice, matchOutcome);
        }

    return totalPoints;
};

function calculateNewScore(opponentChoice, matchOutcome) {
    let pointsWon = 0;

    switch (matchOutcome) {
        case 'X': // I must LOSE
            if (opponentChoice == 'A') pointsWon = (3 + 0); // Opponent chooses ROCK; I must LOSE; I choose SCISSORS -> Shape Point (3) + Lose (0)
            else if (opponentChoice == 'B') pointsWon = (1 + 0); // Opponent chooses PAPER; I must LOSE; I choose ROCK -> Shape Point (1) + Lose (0)
            else pointsWon = (2 + 0); // Opponent chooses SCISSORS; I must LOSE; I choose PAPER -> Shape Point (2) + Lose (0)
            break;
        case 'Y': // I must DRAW
            if (opponentChoice == 'A') pointsWon = (1 + 3); // Opponent chooses ROCK; I must DRAW; I choose ROCK -> Shape Point (1) + Draw (3)
            else if (opponentChoice == 'B') pointsWon = (2 + 3); // Opponent chooses PAPER; I must DRAW; I choose PAPER -> Shape Point (2) + Draw (3)
            else pointsWon = (3 + 3); // Opponent chooses SCISSORS; I must DRAW; I choose SCISSORS -> Shape Point (3) + Draw (3)
            break;
        case 'Z': // I must WIN
            if (opponentChoice == 'A') pointsWon = (2 + 6); // Opponent chooses ROCK; I must WIN; I choose PAPER -> Shape Point (2) + Win (6)
            else if (opponentChoice == 'B') pointsWon = (3 + 6); // Opponent chooses PAPER; I must WIN; I choose SCISSORS -> Shape Point (3) + Win (6)
            else pointsWon = (1 + 6); // Opponent chooses SCISSORS; I must WIN; I choose ROCK -> Shape Point (1) + Win (6)
            break;
    }

    return pointsWon;
}

console.log(`Q2: The total score if everything goes exactly according to the strategy guide is ` + solutionTwo(inputArray) + ` points!`);