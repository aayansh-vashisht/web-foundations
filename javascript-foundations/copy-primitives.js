let originalScore = 100;
let copyScore = originalScore; // Creates an independent copy

copyScore = 200;

console.log(originalScore); // 100 (unaffected)
console.log(copyScore);     // 200