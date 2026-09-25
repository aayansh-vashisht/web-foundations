// The rest parameter (...numbers) gathers all incoming numbers into an array
function sumAll(...numbers) {
    return numbers.reduce((total, current) => total + current, 0);
}

console.log(sumAll(5, 10));             // 15
console.log(sumAll(1, 2, 3, 4, 5, 6)); // 21