const colors = ["red", "green", "blue", "yellow"];

// Start at index 1, remove 2 elements, insert "purple"
const removed = colors.splice(1, 2, "purple");

console.log(removed); // ["green", "blue"] (Returned removed items)
console.log(colors);  // ["red", "purple", "yellow"] (Original array mutated!)