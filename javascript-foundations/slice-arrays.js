const animals = ["Cat", "Dog", "Elephant", "Tiger", "Bear"];

const domestic = animals.slice(0, 2);

console.log(domestic); // ["Cat", "Dog"] (New array)
console.log(animals);  // ["Cat", "Dog", "Elephant", "Tiger", "Bear"] (Unchanged)