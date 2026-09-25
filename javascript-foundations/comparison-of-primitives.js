const scoreA = 100;
const scoreB = 100;
console.log(scoreA === scoreB); // true (values are identical)

const userA = "Alice";
const userB = "alice";
console.log(userA === userB);   // false (case-sensitive check)

const stateA = null;
const stateB = null;
console.log(stateA === stateB); // true