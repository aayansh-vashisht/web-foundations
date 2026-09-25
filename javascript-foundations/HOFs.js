// Example 1: HOF taking a function as an argument
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((n) => n * 2); // .map() is a higher-order function
console.log(doubled); // [2, 4, 6, 8]

// Example 2: HOF returning a brand-new function
function createMultiplier(multiplier) {
    return function (value) {
        return value * multiplier;
    };
}

const triple = createMultiplier(3);
console.log(triple(10)); // 30