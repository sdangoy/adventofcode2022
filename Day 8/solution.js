const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}

const dataInput = syncReadFile('./Day 8/input.txt');

function solutionOne(data) {
    let rowSize = getGridSize(data)[0];
    let columnSize = getGridSize(data)[1];

    let visibleTrees = 0;

    visibleTrees += rowSize * 2; // Outside rows are visible.
    visibleTrees += columnSize * 2; // Outside columns are visible.
    visibleTrees -= 4; // Counted each corners twice.

    for (let i = 1; i < rowSize - 1; i++) {
        for (let j = 1; j < columnSize - 1; j++) {
            let currTree = data[i][j];
            let visibleFromHorizontal = isVisibleHorizontally(data, i, j, columnSize, currTree);

            if (visibleFromHorizontal) {
                visibleTrees++;
                continue;
            }

            let visibleFromVertical = isVisibleVertically(data, i, j, rowSize, currTree);

            if (visibleFromVertical) {
                visibleTrees++;
                continue;
            }
        }
    }

    return visibleTrees;
}

function getGridSize(grid) {
    let row = 0;

    for (let i = 0; i < grid.length; i++) {
        row++;
    }

    let column = grid[0].length;

    return [row, column];
}

function isVisibleHorizontally(grid, row, col, columnSize, currTree) {
    let visibleFromLeft = checkLeft(grid, row, col, currTree);

    if (visibleFromLeft) { return true; }

    let visibleFromRight = checkRight(grid, row, col, columnSize, currTree);

    if (visibleFromRight) { return true; }

    return false;
}

function checkLeft(grid, row, col, currTree) {
    for (let j = col-1; j >= 0; j--) {
        if (grid[row][j] >= currTree) {
            return false;
        }
    }

    return true;
}

function checkRight(grid, row, col, columnSize, currTree) {
    for (let j = col+1; j < columnSize; j++) {
        if (grid[row][j] >= currTree) {
            return false;
        }
    }

    return true;
}

function isVisibleVertically(grid, row, col, rowSize, currTree) {
    let visibleFromAbove = checkUp(grid, row, col, currTree);
    
    if (visibleFromAbove) { return true; }

    let visibleFromBelow = checkDown(grid, row, col, rowSize, currTree);

    if (visibleFromBelow) { return true; }

    return false;
}

function checkUp(grid, row, col, currTree) {
    for (let i = row-1; i >=0; i--) {
        if (grid[i][col] >= currTree) {
            return false;
        }
    }

    return true;
}

function checkDown(grid, row, col, columnSize, currTree) {
    for (let i = row+1; i < columnSize; i++) {
        if (grid[i][col] >= currTree) {
            return false;
        }
    }

    return true;
}

console.log(`Q1: There are ${solutionOne(dataInput)} trees visible from outside of the grid.`);



function solutionTwo(data) {
    let rowSize = getGridSize(data)[0];
    let columnSize = getGridSize(data)[1];

    let highestScenicScore = 0;

    for (let i = 0; i < rowSize - 1; i++) {
        for (let j = 0; j < columnSize - 1; j++) {
            let currTree = data[i][j];
            let currScenicScore = 0;

            let leftScenicScore = getLeftScore(data, i, j, currTree);
            let rightScenicScore = getRightScore(data, i, j, columnSize, currTree);
            let aboveScenicScore = getAboveScore(data, i, j, currTree);
            let belowScenicScore = getBelowScore(data, i, j, rowSize, currTree);

            currScenicScore = leftScenicScore * rightScenicScore * aboveScenicScore * belowScenicScore;
            highestScenicScore = Math.max(currScenicScore, highestScenicScore);
        }
    }

    return highestScenicScore;
}

function getLeftScore(data, row, col, currTree) {

    if (col == 0) { return 0; }

    let score = 0;
        
    for(let j = col-1; j >= 0; j--) {
        if (data[row][j] < currTree) {
            score++;
        } else {
            score++;
            return score;
        }
    }

    return score;
}

function getRightScore(data, row, col, columnSize, currTree) {
    
    if (col == columnSize - 1) { return 0; }

    let score = 0;

    for (let j = col+1; j < columnSize; j++) {
        if (data[row][j] < currTree) {
            score++;
        } else {
            score++;
            return score;
        }
    }

    return score;
}

function getAboveScore(data, row, col, currTree) {
    
    if (row == 0) { return 0; }

    let score = 0;

    for (let i = row-1; i >= 0; i--) {
        if (data[i][col] < currTree) {
            score++;
        } else {
            score++;
            return score;
        }
    }

    return score;
}

function getBelowScore(data, row, col, rowSize, currTree) {
    
    if (row == rowSize - 1) { return 0; }

    let score = 0;

    for (let i = row+1; i < rowSize; i++) {
        if (data[i][col] < currTree) {
            score++;
        } else {
            score++;
            return score;
        }
    }

    return score;
}


console.log(`Q2: The highest scenic score possible for any tree is: ${solutionTwo(dataInput)}.`);
