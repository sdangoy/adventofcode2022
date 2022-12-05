**-- Introduction --**

For this problem, I took into account the variability of the input grid. Rather than hardcoding the given problem's input grid, I wanted to write a more flexible code that can correctly get the top-most crate from each column, regardless of the size of the grid.

To demonstrate my code's flexibility, I ran my solution on both the question's example input and the actual input. Despite the difference in size of the grids (example grid: 3x3 vs. input grid: 9x8), both outputs are correct.

In order to achieve the "dynamic" reading of the input grid, I had to determine two important things:

Q1. How many lines of code ("rows") in the input described the grid's layout? In other words, how DEEP was the input grid?

Q2. How many columns were in the grid? In other words, how WIDE was the input grid?

**-- Solving Q1 --**

To determine the depth of the grid, the code needs to sort out where the description of the grid ends and where the move directions started. This was easily solved by traversing each line from the top (keeping count of how many lines have been traversed with a counter, `i`) until **the line before the empty line** that seperated the grid information from the directions. The last line of grid information can be ignored since it only contains the column labels used for visual clarity and does not count as part of the actual grid. The remaining number of lines traversed indicates the depth of the grid (`depth = i - 1`).


**-- Solving Q2 --**

To determine the width of the grid, the code takes the line that contains the column labels, converts it into an array, and returns the contents of the last index of the array (which stores the last column of the grid as a string). The array created from the column labels line with the `.split()` function needs to be filtered using `.filter(element => element)` to remove whitespace and get an array with only column labels. From here, the grid's last column is easily accessed (`width = array[array.length - 1]`). The string is converted into an integer before passing.


**-- Solving the question: "How to store the column stack?" --**

The code must have a way to optimally store a column's stack, perferably in a way that can still utilize stack properties for future operations. A `Map` object was selected because of its fast `.set()` and `.get()` functions (`Runtime: O(1)`). The keys are the columns (`type: number`) and the values are the crates in the column (`type: string`). The value being of type `string` allows for an easy transition to arrays using `.split()`. We can use an array's fast `.pop()` and `.push()` functions (`Runtime: O(1)`) to easily solve the first part. Strings are also easy to manipulate with `.slice()` and the `+ operator` which can be taken advantage of to solve the second part.

When initalizing the column map, crates are inputted into the value string from **bottom to top**. For each "row" of the grid, a crate in the column will be indicated as `[#]`. There is exactly 4 characters between crate labels from separate columns (`i = i + 4`). Because of the opening '[' bracket, we start at line[1] (`i = 1`).

For example:
<pre>
    [D]     <-- End at top-most row
[N] [C]    
[Z] [M] [P] <-- Start at bottom-most row
 1   2   3 
0123456789 <-- indices
 i   4   4 <-- space between; each column label falls under indexes: 1, 5 (1 + 4), 9 (5 + 4), ...
</pre>

 If `line[i]` is empty, there is no crate in that column. When traversing **up** the "rows" of the grid, we check each column from **left to right**. If there is a crate in a column, the code gets the column's string from map, appends the new crate at the end of the string, and updates map with the column's new string.

For example, the example input:
<pre>
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
</pre>

Will be stored as `Map(3) {size: 3, 1 => ZN, 2 => MCD, 3 => P}`