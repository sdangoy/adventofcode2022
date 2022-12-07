const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    return contents;
}

const inputArray = syncReadFile('../Day 6/input.txt');

function solutionOne(data) {
    let startWindow = 0;
    let endWindow = 4;
    let numberOfChars = 4; // According to question, a valid start-of-packet consists of 4 characters.

    let uniqueLetters = new Set();

    for (let i = 0; i < data.length; i++) {
        let currentWindow = data.slice(startWindow, endWindow);

        if (checkWindow(currentWindow, uniqueLetters, numberOfChars)) {
            return endWindow;
        }

        uniqueLetters.clear();

        // Shift window to the right by one letter. Can be better implemented (see updated-solution.js).
        startWindow++; 
        endWindow++;
    }

    return Error('No start-of-packet marker detected from given input.');
}

function checkWindow(window, uniqueLetters, numberOfChars) {
    for (let i = 0; i < window.length; i++) {
        uniqueLetters.add(window[i]); // Due to Set property, if value already exists, nothing is inserted.
    }

    if (uniqueLetters.size < numberOfChars) { // When the number of characters needed for a valid marker is equal to set size, then all letters are unique.
        return false;
    }

    return true;
}

console.log(`Q1: The number of characters needed to be processed before the first start-of-packet marker is detected is: ` + solutionOne(inputArray) + `.`);



function solutionTwo(data) {
    let startWindow = 0;
    let endWindow = 14;
    let numberOfChars = 14; // According to question, a valid start-of-message consists of 14 characters.
    
    let uniqueLetters = new Set();

    for (let i = 0; i < data.length; i++) {
        let currentWindow = data.slice(startWindow, endWindow);

        if (checkWindow(currentWindow, uniqueLetters, numberOfChars)) {
            return endWindow;
        }

        uniqueLetters.clear();

        // Instead of going one letter at a time, can be implemented to skip multiple indices.
        startWindow++; 
        endWindow++;
    }

    return Error('No start-of-packet marker detected from given input.');
}

console.log(`Q2: The number of characters needed to be processed before the first start-of-message marker is detected is: ` + solutionTwo(inputArray) + `.`);