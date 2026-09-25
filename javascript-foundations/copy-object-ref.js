const original = { name: "Aayansh" };
const copy = original;

copy.name = "Changed";
console.log(original.name); // Output: "Changed"