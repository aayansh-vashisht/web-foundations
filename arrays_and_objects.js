// ==========================================
// 1. OBJECTS & ARRAYS
// ==========================================

// Object: Key-Value pairs
const developer = {
  name: "Alex",
  experienceYears: 3,
  skills: ["JavaScript", "CSS", "Git"],
  isEmployed: true,
  // Method
  getSummary() {
    return `${this.name} has ${this.experienceYears} years of experience.`;
  }
};

// Accessing and modifying
developer.location = "Berlin"; // Add new property
developer.experienceYears = 4; // Update property
console.log(developer.getSummary());

// Arrays
const numbers = [10, 20, 30, 40, 50];
numbers.push(60);     // Adds to end
numbers.unshift(0);   // Adds to beginning
numbers.pop();        // Removes from end
numbers.shift();      // Removes from beginning


// ==========================================
// 2. ARRAY METHODS
// ==========================================

const products = [
  { id: 1, name: "Keyboard", price: 75, inStock: true },
  { id: 2, name: "Mouse", price: 30, inStock: true },
  { id: 3, name: "Monitor", price: 200, inStock: false },
  { id: 4, name: "Webcam", price: 50, inStock: true },
];

// forEach: Execute a side effect for each element (returns undefined)
products.forEach((product) => {
  console.log(`Product: ${product.name} costs $${product.price}`);
});

// map: Transforms every element into a new array of the same length
const productNames = products.map((product) => product.name);
console.log("Names:", productNames);

// filter: Returns elements that satisfy a condition
const availableProducts = products.filter((product) => product.inStock);
console.log("Available:", availableProducts);

// find: Returns the FIRST element matching the condition (or undefined)
const monitor = products.find((product) => product.id === 3);
console.log("Found:", monitor);

// some: Returns true if AT LEAST ONE element matches
const hasExpensiveItems = products.some((product) => product.price > 150);
console.log("Has expensive item:", hasExpensiveItems); // true

// every: Returns true ONLY IF ALL elements match
const allInStock = products.every((product) => product.inStock);
console.log("All items in stock:", allInStock); // false

// reduce: Condenses an array down to a single value (number, object, etc.)
// Format: array.reduce((accumulator, current) => result, initialValue)
const totalInventoryValue = products.reduce((accumulator, currentProduct) => {
  return accumulator + currentProduct.price;
}, 0);
console.log("Total inventory cost:", totalInventoryValue);

// Practical Rule: If an operation is easier to read with a standard `for` loop,
// avoid forcing `reduce()` into the ce.
