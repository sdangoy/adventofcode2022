**-- Introduction --**
For this problem, I took into account the variability of the input grid. Rather than hardcoding the given problem's input grid, I decided to make a more flexible code that ran correctly regardless of the size of the grid.

To demonstrate, I added the question's example input and ran the same solution. Despite the difference in size of the grids (example grid: 3x3 vs. input grid: 9x8), the output produced are both correct.

In order to achieve the "dynamic" reading of the grid data, I had to determine two important things:

    Q1. How many lines of code in the input described the grid's layout? In other words, how DEEP was the input grid?

    Q2. How many columns were in the grid? In other words, how WIDE was the input grid?


**-- Solving Q1 --**
To determine the depth of the grid, the code needs to sort out where the description of the grid ends and where the move directions started. This was easily solved by traversing each line (keeping count of how many lines have been passed with a counter, `i`) up to the line before the empty line that seperated the grid information from the directions. The last line of grid information can be ignored since it only contains the column labels used for visual clarity. The remaining number of lines traversed indicates the depth of the grid (`depth = i - 1`).

**-- Solving Q2 --**
To determine the width of the grid, the code finds the last column of the grid by taking the line that contains the column labels and transposes it into an array. The array's last index should be the last column. The array created with the `.split()` function needs to be filtered using `.filter(element => element)` to remove whitespace and get an array with only column labels. From here, the grid's last column is easily accessed (`array[array.length - 1]`).

**-- Solving the question: "How to store the column stack?" --**
The code must have have a way to optimally store a column's stack, perferably in a way that can utilize stack properties for future operations. A `Map` object was selected because of its fast `.set()` and `.get()` functions (`Runtime: O(1)`). The keys are the columns (`type: Int`) and the values are the crates in the column (`type: String`). The value being of type `String` allows for an easy transition to arrays using `.split()` and its fast `.pop()` and `.push()` functions (`Runtime: O(1)`) used to solve the first part. Strings are also easy to manipulate with `.slice()` and the `+ operator` which can be taken advantage of to solve the second part.

When initalizing the column map, crates are inputted into the value string from **bottom of column to top**. For each "row" of the grid, a crate in the column will be indicated as `[#]`. There is exactly 4 characters between crate labels from separate columns (`i = i + 4`). Because of the opening '[' bracket, we start at line[1] (`i = 1`). If `line[i]` is empty, then no crate is in that column. When traversing **up** the "rows" of the grid, we check each column from **left to right**. If there is a crate in a column, the code gets the column's string from map, appends the new crate at the end of the string, and updates map with the column's new string.

For example, the example input:
<pre>
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
</pre>

Will be stored as `Map(3) {size: 3, 1 => ZN, 2 => MCD, 3 => P}`