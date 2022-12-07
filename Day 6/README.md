**-- Introduction --**

This problem had the characteristics of a **sliding-window** problem, which utilizes two different pointers to establish a "window" and sliding that "window" down a string or an array to find a certain condition within the "window."

The window in my initial solution to the problem (solution.js) was traversing down the input string one character at a time with a fixed length. After solving both parts of the problem using that algorithm, I challenged myself to write a smarter and quicker algorithm for the window traversal (updated-solution.js).

To test the difference in execution time, I included `Date.now()` variables in the beginning and end of each solution. The results of the execution times were:

- solution.js (one-at-a-time window sliding): **10ms**
- updated-solution.js ("jumping" window sliding): **9ms**

Although not a massive difference in terms of runtime, the improved algorithm did come out to be faster than my initial algorithm.

**-- Initial Sliding Window Algorithm --**

The initial solution had the advantage of not needing to keep track of a lot of information. The only information that needed to be tracked (besides where the window pointers were pointing at) were the letters that were encountered as we go through the window. Once a letter we've already encountered **before** is encountered **again** inside the same window, the algorithm moves **both** window pointers once to the right, thus sliding the window to the right by **one** letter. The object storing the letters encountered must also be cleared before going through the new window letter by letter again.

The data structure that stores the encountered letters was carefully chosen to be a `Set Object`. By utilizing the `.add()` function of a `Set Object`, we are able to check if the unique letters in a window matches the required number of letters (**4** for packets and **14** for messages) based off the information given in the question. All characters in the **fixed-length** window (length varies depending if looking for packets or messages) are parsed using a `for` loop and added into the `Set`. When going through the window, if a letter is already found in the `Set`, the `.add()` function will not store it again. The size of the `Set` can then be compared to the size needed for a complete packet/message to see if a valid marker has been found. If the sizes match, then the **end pointer of the window** is the answer to the question.

This can be demonstrated visually here:

<pre>
Example input: "abcae"; Assume looking for start-of-packet marker (window size = 4)

Step 1: Establish sliding window (indicated by | |)
|abca|e

Step 2: Go through window and store unique letters into Set
|abca|e   --->   Set {size 3: 'a', 'b', 'c'}; 'a' appears twice but stored once 
 ^^^^

Step 3: Compare Set size with required size
3 = Set.size !== packetSize = 4

Step 4: Slide window to the right once (windowStart++ and windowEnd++)
a|bcae|
</pre>

From this point, the algorithm repeats Step 2 - 4 until **all letters in the sliding window are unique**. In the example above, the marker would be **`bcae`** with the number of characters needed to be processed being **`5`** (`windowEnd = 4 + 1`).

***NOTE: In the code, the `endWindow` pointer is initalized to `windowLength` because the `.slice(start, end)` function in `Strings` does not include the end index. Ths also keeps track of how many letters were traversed (notice below how the `endWindow` pointer is always pointing at the index that matches the number of letters passed). In this solution, it is always the case that `windowEnd = windowStart + 4`.***

<pre>
|abca|de   --->   .split(0,4) = "abca" <- the current window
 0123 45          windowStart = 0, windowEnd = 4 with 4 total letters traversed
 1234             'a' is repeating, move windowStart and windowEnd to right +1
 ^    ^ .          
 s    e

a|bcad|e   --->   .split(1,5) = "bcad" <- the current window
0 1234 5          windowStart = 1 + 4 = windowEnd = 5 with 5 total letters traversed
1 2345 
  ^    ^
  s    e
</pre>

The **worst case** scenario for this algorithm is when there are muliples of the same letter right next to each other. This inital algorithm will go through each copy of the same letter `n` amount of times. Additionally, this algorithm also struggles with inputs that have repeating letters **close together**, especially when the **window size increases**. For example:

<pre>
Initial one-at-a-time algorithm:

Ex. 1
|ssss|ssabc   --->    s|ssss|sabc   --->    +3 iterations...   --->   sssss|sabc|

Final solution will be reached after 5 iterations.

Ex. 2
Assume window size is 6
|xatxcx|befga   --->   x|atxcxb|efga   --->   xa|txcxbe|fga   --->    xat|xcxbefg|a   --->    xatx|cxbefga|

Final solution will be reached after 5 iterations. This alogirthm does not know WHERE the duplicated letters are, it just knows that there are duplicate letters.
</pre>

**-- Updated Sliding Window Algorithm --**

The updated sliding window alogrithm was specifically designed to handle the scenario of having many of the same letters close to each other, especially with a big window size. Instead of sliding the window one letter at it time, this alogrithm **knows the locations** of both duplicated letters and **slides the window one letter to the right of the first instance of the duplicated letters**. This makes the window capable of sliding across multiple positions at once, making this algorithm slightly faster the initial one. In order to do this, however, additional information must be stored.

Unlike the initial algorithm that used a `Set Object` as the data structure to store unique letters within the current window, this algorithm uses a `Map Object` to store the extra information needed. The `Map Object` allows us to keep track of 1. unique letters we've come across and 2. the indices of the letters we've already come across by storing them as keys and values, respectiviely. Knowing WHERE letters are in terms of the window is the key to effecient window traversal.

Furthermore, the window length in this algorithm starts off with a size of 0 and **grows** as the input is traversed. When there are no repeating letters, the window will continue to grow and store letters and indices into the `Map` until it reaches the size of a packet/message, in which case it returns the `windowEnd` pointer similar to the initial algorithm. If a repeating letter is found, the `Map` is cleared and window size reverting back to 0 by moving the `windowStart` pointer **one letter to the right of the *FIRST* instance of the repeated letter** and setting `windowEnd` to the same index as `windowStart`. If the repeated letters are within the window, everything ***before*** the letters cannot be considered part of a valid packet/message marker. For example:

Since this algorithm does not use a fixed window size, we save a little bit of memory consumption since we don't have to save a copy of the window after every new `.slice()`.

<pre>
Example input: "abccbef"; Assume looking for start-of-packet marker (window size = 4)

Step 1: Establish sliding window (indicated by | |)
|a|bccdef

Step 2: Traverse input and increase window size for every unique letter
|a|bccdef   --->   |ab|ccde

Step 3: Compare Map size with required size
2 = Map.size !== packetSize = 4

Step 4a: If it was a unique letter, slide windowEnd to the right once
|abc|cdef

Step 4b: If it was a repeated leter, slide windowStart one to the right of first instance of letter and reset windowEnd
|abcc|def   --->   abc|c|def
</pre>

This algorithm shines when dealing with inputs that have repeating letters close together. However it also performs similarly to the initial algorithm during situations where the same letter is repeated `n` times and when the first instance of the repeated letter is the first letter in the window. In those situations, the window only moves one letter to the right. There are two situations that led to this reasoning:

<pre>
Situation 1 - Moving one letter to the right of the SECOND instance of the repeated letter

Although it would move the window more quickly into the right position, doing so may lead to missing out on the correct window, as the last repeated character may need to be the first letter in the window.

Ex:
|tbet|aqva...   --->   tbet|aqva|...   --->   ...algorithm missed the correct |beta| window


Situation 2 - Moving to the SECOND instance of the repeated letter

This may solve the problem posed by Situation 1, however, it is still possible to miss out on the correct window by sliding past it.

Ex:
|quiq|mqt...   --->   qui|qmqt|...   ---> ...algorithm missed the correct |uiqm| window
</pre>

Below is how the updated algorithm handles the same examples given to the initial algorithm. For visual clarity, the second example has all the window-building steps displayed up to a given point. It is possible to come up with an even more optimized algorithm to handle these pain points more effeciently.

<pre>
Faster "jumping" alogirthm

Ex. 1
|s|sssssabc   --->   |ss|ssssab|c   --->   s|s|ssssabc   --->   s|ss|sssabc   --->   ss|s|sssabc

Algorithm struggles as it builds, breaks, and rebuilds the window multiple times with many repeated characters nearby.

Ex. 2
Assume window size is 6
|x|atxcxbefga   --->   |xa|txcxbefga   --->   |xat|xcxbefga   --->    |xatx|cxbefg|a    --->    x|a|txcxbefga
x|at|xcxbefga   --->   x|atx|cxbefga   --->   x|atxc|xbefga   --->    x|atxcx|befga   --->    xatx|c|xbefga

Was able to slide window down 3 letters, saving some time. This algorithm works best when the repeated character isn't the first letter in the window and smaller windows so that it can utilize multi-letter slides
</pre>
