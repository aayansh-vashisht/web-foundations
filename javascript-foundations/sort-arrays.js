const numbers = [40, 100, 5, 25];

// Provide a comparison callback for numeric sorting:
numbers.sort((a, b) => a - b);

console.log(numbers); // [5, 25, 40, 100] (Original array mutated!)