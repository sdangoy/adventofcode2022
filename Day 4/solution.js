const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}

const inputArray = syncReadFile('./Day 4/input.txt');

function solutionOne(data) {
    let numberOfFullyContainedPairs = 0;

    for (let i = 0; i < data.length; i++) {
        let sections = (seperateSections(data[i]));

        let firstSection = sections[0];
        let secondSection = sections[1];

        let firstSectionLength = getSectionLength(firstSection);
        let secondSectionLength = getSectionLength(secondSection);

        // Pass the smallest range as the first argument for checkIfFullyContained.
        if (firstSectionLength < secondSectionLength) {
            numberOfFullyContainedPairs += checkIfFullyContained(firstSection, secondSection);
        } else {
            numberOfFullyContainedPairs += checkIfFullyContained(secondSection, firstSection);
        }
    }

    return numberOfFullyContainedPairs;
}

function seperateSections(input) {
    return input.split(','); // Example return format: ['38-41' , '38-38'] where [0] is section 1 and [1] is section 2.
}

function getSectionLength(range) {
    let startRange = parseInt(getRangeValues(range)[0]);
    let endRange = parseInt(getRangeValues(range)[1]);

    return (endRange - startRange) + 1; 
}

function getRangeValues(range) {
    return range.split('-'); // Example return format: ['38', '41'] where [0] is start of range and [1] is end of range.
}

function checkIfFullyContained(smallSection, bigSection) {
    let smallStartValue = parseInt(getRangeValues(smallSection)[0]);
    let smallEndValue = parseInt(getRangeValues(smallSection)[1]);

    let bigStartValue = parseInt(getRangeValues(bigSection)[0]);
    let bigEndValue = parseInt(getRangeValues(bigSection)[1]);

    if (smallStartValue >= bigStartValue && smallEndValue <= bigEndValue) {
        return 1;
    }

    return 0;
}

console.log('Q1: The number of times a range is fully contained in another within an assignment pair is ' + solutionOne(inputArray) + ' times!');



function solutionTwo(data) {
    let numberOfOverlappingPairs = 0;

    for (let i = 0; i < data.length; i++) {
        let sections = (seperateSections(data[i]));

        let firstSection = sections[0];
        let secondSection = sections[1];

        let firstSectionStartValue = parseInt(getRangeValues(firstSection)[0]);
        let secondSectionStartValue = parseInt(getRangeValues(secondSection)[0]);

        // Pass the lowest starting range as the first argument for checkIfOverlapping.
        if (firstSectionStartValue < secondSectionStartValue) {
            numberOfOverlappingPairs += checkIfOverlapping(firstSection, secondSection);
        } else {
            numberOfOverlappingPairs += checkIfOverlapping(secondSection, firstSection);
        }
    }

    return numberOfOverlappingPairs;
}

function checkIfOverlapping(lowestStartingSection, highestStartingSection) {
    let lowestStartingEndValue = parseInt(getRangeValues(lowestStartingSection)[1]);

    let highestStartingStartValue = parseInt(getRangeValues(highestStartingSection)[0]);

    if (lowestStartingEndValue >= highestStartingStartValue) { // Assuming a range includes all numbers between start and end.
        return 1;
    }

    return 0;
}

console.log('Q2: The number of overlapping assignment pairs is ' + solutionTwo(inputArray) + ' pairs!');