const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const inputArray = syncReadFile('./Day 3/input.txt');

function solutionOne(data) {
    let totalPrioritySum = 0;

    for (let i = 0; i < data.length; i++) {
        let sizeOfCompartment = data[i].length / 2;
        totalPrioritySum += compareCompartments(data[i], sizeOfCompartment);
    }

    return totalPrioritySum;
};

function compareCompartments(input, size) {
    let firstCompartment = new Set(); // Set used due to focusing on individual chars/items and O(1) look-up time.

    for (let i = 0; i < size; i++) { // Store first half of input string into set.
        firstCompartment.add(input[i]); 
    }

    for (let i = size; i < input.length; i++) { // Go through second half of string. For each char/item, check to see if it is also found in the first half of string.
        if (firstCompartment.has(input[i])) return calculatePriorityPoints(input[i]);
    }

    return 0;
}

function calculatePriorityPoints(item) {
    if (item >= 'a' && item <= 'z') {
        return (asciiDifference(item, 'a')) + 1; // +1 because 'a' - 'z' range is 1 - 26.
    }
    
    else if (item >= 'A' && item <= 'Z') {
        return (asciiDifference(item, 'A')) + 27; // +27 because 'A' - 'Z' range is 27 - 52.
    }

    else throw Error('Invalid character in input.');
}

// Converts ASCII characters to their ASCII decimal values via charCodeAt() to calculate priority points (0 - 25).
function asciiDifference(char1, char2) {
    return char1.charCodeAt(0) - char2.charCodeAt(0);
}

console.log(`Q1: The sum of the priorities for the item types that appears in both compartments of each rucksack is ` + solutionOne(inputArray) + `!`);



function solutionTwo(data) {
    let totalGroupsPrioritySum = 0;

    for (let i = 0; i < data.length; i += 3) {
        let elfSets = createSets(data[i], data[i+1], data[i+2]);
        let badgeItem = findCommonItem(elfSets[0], elfSets[1], elfSets[2])
        totalGroupsPrioritySum += calculatePriorityPoints(badgeItem);
    }

    return totalGroupsPrioritySum;
}

function createSets(elfOneInventory, elfTwoInventory, elfThreeInventory) {
    let firstElfSet = new Set();
    let secondElfSet = new Set();
    let thirdElfSet = new Set();

    for (let i = 0; i < elfOneInventory.length; i++) {
        firstElfSet.add(elfOneInventory[i]);
    }

    for (let j = 0; j < elfTwoInventory.length; j++) {
        secondElfSet.add(elfTwoInventory[j]);
    }

    for (let k = 0; k < elfThreeInventory.length; k++) {
        thirdElfSet.add(elfThreeInventory[k]);
    }

    return [firstElfSet, secondElfSet, thirdElfSet];
}

function findCommonItem(firstElfSet, secondElfSet, thirdElfSet) {
    for (const item of firstElfSet) {
        if (secondElfSet.has(item) && thirdElfSet.has(item)) { // Assumes that there is only ONE char/item found in all three inventories.
            return item;
        }
    }

    throw Error('No matching char/item');
}

console.log(`Q2: The sum of the priorities for the item types that appears in each three-Elf groups is ` + solutionTwo(inputArray) + `!`);
