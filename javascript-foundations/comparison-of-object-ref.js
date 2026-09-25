// 1. Independent objects with identical contents
const box1 = { item: "book" };
const box2 = { item: "book" };

console.log(box1 === box2); // false (different memory addresses)

// 2. Independent arrays with identical contents
const list1 = [1, 2, 3];
const list2 = [1, 2, 3];

console.log(list1 === list2); // false (different memory addresses)

// 3. Shared reference
const box3 = box1; // box3 points to the exact same memory address as box1

console.log(box1 === box3); // true (same reference)