const person = { name: "Maya", age: 24 };
person.age = 25; // Mutation: modified property in-place

const colors = ["red", "blue"];
colors.push("green"); // Mutation: altered the original array

console.log(person); // { name: "Maya", age: 25 }
console.log(colors); // ["red", "blue", "green"]