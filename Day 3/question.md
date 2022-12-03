**--- Day 3: Rucksack Reorganization ---**

One Elf has the important job of loading all of the rucksacks with supplies for the jungle journey. Unfortunately, that Elf didn't quite follow the packing instructions, and so a few items now need to be rearranged.

Each rucksack has two large **compartments**. All items of a given type are meant to go into exactly one of the two compartments. The Elf that did the packing failed to follow this rule for exactly one item type per rucksack.

The Elves have made a list of all of the items currently in each rucksack (your puzzle input), but they need your help finding the errors. Every item type is identified by a single lowercase or uppercase letter (that is, <code>a</code> and <code>A</code> refer to different types of items).

The list of items for each rucksack is given as characters all on a single line. A given rucksack always has the same number of items in each of its two compartments, so the first half of the characters represent items in the first compartment, while the second half of the characters represent items in the second compartment.

For example, suppose you have the following list of contents from six rucksacks:

`vJrwpWtwJgWrhcsFMMfFFhFp`
`jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL`
`PmmdzqPrVvPwwTWBwg`
`wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn`
`ttgJtRGJQctTZtZT`
`CrZsJsPPZsGzwwsLwLmpwMDw`

- The first rucksack contains the items <code>vJrwpWtwJgWrhcsFMMfFFhFp</code>, which means its first compartment contains the items <code>vJrwpWtwJgWr</code>, while the second compartment contains the items <code>hcsFMMfFFhFp</code>. The only item type that appears in both compartments is lowercase **<code>p</code>**.
- The second rucksack's compartments contain <code>jqHRNqRjqzjGDLGL</code> and <code>rsFMfFZSrLrFZsSL</code>. The only item type that appears in both compartments is uppercase **<code>L</code>**.
- The third rucksack's compartments contain <code>PmmdzqPrV</code> and <code>vPwwTWBwg</code>; the only common item type is uppercase **<code>P</code>**.
- The fourth rucksack's compartments only share item type **<code>v</code>**.
- The fifth rucksack's compartments only share item type **<code>t</code>**.
- The sixth rucksack's compartments only share item type **<code>s</code>**.

To help prioritize item rearrangement, every item type can be converted to a **priority**:

- Lowercase item types a through z have priorities 1 through 26.
- Uppercase item types A through Z have priorities 27 through 52.

In the above example, the priority of the item type that appears in both compartments of each rucksack is 16 (<code>p</code>), 38 (<code>L</code>), 42 (<code>P</code>), 22 (<code>v</code>), 20 (<code>t</code>), and 19 (<code>s</code>); the sum of these is **<code>157</code>**.

Find the item type that appears in both compartments of each rucksack. **What is the sum of the priorities of those item types?**