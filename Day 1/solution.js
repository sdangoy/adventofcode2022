const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const inputArray = syncReadFile('input.txt');

function solutionOne(data) {
    let highestTotalCalories = 0;
    let currentTotalCalories = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i] == '') {
            if (currentTotalCalories > highestTotalCalories) highestTotalCalories = currentTotalCalories;
            currentTotalCalories = 0;
        } else {
            currentTotalCalories += parseInt(data[i], 10);
        }
    }

    return highestTotalCalories;
};

console.log(`Q1: The Elf carrying the most calories is carrying ` + solutionOne(inputArray) + ` calories!`);



function solutionTwo(data) {
    let highestTotalCalories = [0,0,0];
    let currentTotalCalories = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i] == '') {
            if (currentTotalCalories >= highestTotalCalories[2]) {
                reorderArray(highestTotalCalories, currentTotalCalories);
            }
            currentTotalCalories = 0;
        } else {
            currentTotalCalories += parseInt(data[i], 10);
        }
    }

    return (highestTotalCalories[0] + highestTotalCalories[1] + highestTotalCalories[2]);
};

function reorderArray(highestTotalCalories, newAddition) {
    if (newAddition >= highestTotalCalories[1]) {
        if (newAddition >= highestTotalCalories[0]) {
            highestTotalCalories[2] = highestTotalCalories[1];
            highestTotalCalories[1] = highestTotalCalories[0];
            highestTotalCalories[0] = newAddition;
        } else {
            highestTotalCalories[2] = highestTotalCalories[1];
            highestTotalCalories[1] = newAddition;
        }
    } else {
        highestTotalCalories[2] = newAddition;
    }

    return;
}

console.log(`Q2: The top three Elves carrying the most calories are carrying a total of ` + solutionTwo(inputArray) + ` calories!`);
