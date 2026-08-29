/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let currentMax;
    for (let i = 0; i < numbers.length; i++) {
        if (currentMax === undefined || numbers[i] > currentMax) {
            currentMax = numbers[i];
        }
    }
    return currentMax;
}

module.exports = findLargestElement;