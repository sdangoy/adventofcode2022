const {readFileSync, promises: fsPromises} = require('fs');
const { start } = require('repl');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}

const inputArray = syncReadFile('./Day 5/input.txt');

function solutionOne(data) {
    let gridLines = findEndOfGridData(data);
    let numberOfColumns = findNumberOfGridColumns(data, gridLines);
    let gridMap = initalizeGrid(data, gridLines, numberOfColumns);

    let directionStartLine = gridLines + 2; // +2 to start on first line of directions.

    for (let i = directionStartLine; i < data.length; i++) {
        let values = getValuesFromDirections(data[i]);

        // Assuming the format of directions is always: "move [0] from [1] to [2]."
        let numberToMove = parseInt(values[0]); 
        let removeFromColumn = parseInt(values[1]);
        let movedToColumn = parseInt(values[2]);

        moveCrates(gridMap, numberToMove, removeFromColumn, movedToColumn);
    }

    return getTopCratesFromColumns(gridMap, numberOfColumns);
}

function findEndOfGridData(data) { // Used to determine what lines in input file consist of input grid.
    let i = 0;

    while (data[i+1] !== '') {
        i++;
    }

    return i; // Returns the last line number describing input grid (the most bottom crate in each column).
}

function findNumberOfGridColumns(data, gridLines) { // Used to determine number of columns in the input grid.
    let columnArray = data[gridLines].split(' ').filter(element => element); // .filter() removes whitespace from array.
    
    return parseInt(columnArray[columnArray.length - 1]);
}

function initalizeGrid(data, gridLines, numberOfColumns) {
    let gridMap = new Map();

    for (let i = 1; i <= numberOfColumns; i++) {
        gridMap.set(i, ''); // Key type is integer; Value type is string.
    }

    return fillInGrid(data, gridLines, gridMap);
}

function fillInGrid(data, gridLines, gridMap) {

    // Fill in map starting with crates at the bottom to keep stack properties.
    for (let i = gridLines-1; i >= 0; i--) { // -1 because gridLines is referencing the numbered columns line in input.
        let columnCounter = 1;

        for (let j = 1; j < data[i].length; j += 4) { // +4 due to the number of characters between crate names; First crate name starts at j = 1.
            if (data[i][j] !== ' ') { // Check if there is a crate in the current column.
                let cratesInColumn = gridMap.get(columnCounter);
                let updatedCrates = cratesInColumn + data[i][j]; // Add crate to string of crates in the column.

                gridMap.set(columnCounter, updatedCrates)
            }

            columnCounter++;
        }
    }

    return gridMap;
}

function getValuesFromDirections(direction) {
    return direction.match(/\d+/g); // Creates an array that stores all numbers found in a direction.
}

function moveCrates(grid, crateNumber, removeColumn, addColumn) {
    let removeColumnArray = stringToArray(grid.get(removeColumn)); // Convert to array to create a stack.
    let addColumnArray = stringToArray(grid.get(addColumn));

    for (let i = 0; i < crateNumber; i++) {
        if (removeColumnArray.length > 0) {
            let currentCrate = removeColumnArray.pop(); // Utilize an array's O(1) pop property.
            addColumnArray.push(currentCrate); // Utilize an array's O(1) push property.
        }
    }

    grid.set(removeColumn, removeColumnArray.join(''));
    grid.set(addColumn, addColumnArray.join(''));

    return grid;
}

function stringToArray(string) {
    return string.split('');
}

function getTopCratesFromColumns(grid, numberOfColumns) {
    let cratesAtTop = '';

    for (let i = 1; i <= numberOfColumns; i++) {
        let currentColumnArray = stringToArray(grid.get(i));
        let topCrate = currentColumnArray.length - 1;

        if (currentColumnArray.length > 0)
            cratesAtTop += currentColumnArray[topCrate];
    }

    return cratesAtTop;
}

console.log(`Q1: The crates that end up on top of each stack is: ` + solutionOne(inputArray) + `.`);



function solutionTwo(data) {
    let gridLines = findEndOfGridData(data);
    let numberOfColumns = findNumberOfGridColumns(data, gridLines);
    let gridMap = initalizeGrid(data, gridLines, numberOfColumns);

    let directionStartLine = gridLines + 2; // +2 to start on first line of directions.

    for (let i = directionStartLine; i < data.length; i++) {
        let values = getValuesFromDirections(data[i]);

        // Assuming the format of directions is always: "move [0] from [1] to [2]."
        let numberToMove = parseInt(values[0]); 
        let removeFromColumn = parseInt(values[1]);
        let movedToColumn = parseInt(values[2]);

        updateMoveCrates(gridMap, numberToMove, removeFromColumn, movedToColumn);
    }

    return getTopCratesFromColumns(gridMap, numberOfColumns);
}

function updateMoveCrates(grid, crateNumber, removeColumn, addColumn) {
    let removeColumnString = grid.get(removeColumn);
    let addColumnString = grid.get(addColumn);

    let startIndex = removeColumnString.length - crateNumber; // Get index of first crate to remove in string.

    let updatedRemoveColumn = removeColumnString.slice(0, startIndex);
    let updatedAddColumn = addColumnString + removeColumnString.slice(startIndex);

    grid.set(removeColumn, updatedRemoveColumn);
    grid.set(addColumn, updatedAddColumn);

    return grid;
}

console.log(`Q2: After the new rearrangement procedures, the crates that end up on top of each stack is: ` + solutionTwo(inputArray) + `.`);