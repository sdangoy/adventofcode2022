const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    return contents;
}

const inputArray = syncReadFile('../Day 6/input.txt');

function solutionOne(data) {
    let packetLength = 4; // According to question, a valid start-of-packet consists of 4 characters.
    
    return findFirstMarker(data, packetLength);
}

function findFirstMarker(data, windowLength) {
    let storedLetters = new Map(); // Utilize a Map Object in this solution to store letter (key) and index (value).
    let windowStart = 0;
    let windowEnd = 0;

    while (windowEnd < data.length) {          
        if (storedLetters.has(data[windowEnd])) {
            let moveTo = storedLetters.get(data[windowEnd]) + 1; // Move to the letter after the first appearance of repeated letter.
            windowStart = moveTo; // Capable of moving the start of window across multiple characters.
            windowEnd = windowStart;
            storedLetters.clear();
        } else {
            storedLetters.set(data[windowEnd], windowEnd); // Store letter as key, and index letter as value.
            windowEnd += 1;

            if (storedLetters.size == windowLength) { // If number of unique letters matches the size needed, the last index of window is the marker.
                return windowEnd;
            }
        }
    }

    return Error('No valid start-of-message marker.');
}

console.log(`Q1: The number of characters needed to be processed before the first start-of-packet marker is detected is: ` + solutionOne(inputArray) + `.`);



function solutionTwo(data) {
    let messageLength = 14; // According to question, a valid start-of-message consists of 14 characters.
    
    return findFirstMarker(data, messageLength);
}

console.log(`Q2: The number of characters needed to be processed before the first start-of-message marker is detected is: ` + solutionTwo(inputArray) + `.`);