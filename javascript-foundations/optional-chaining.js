const userA = {
    name: "Sam",
    address: { city: "Seattle" }
};

const userB = {
    name: "Chris" // No address property
};

// Safe access down the tree
console.log(userA.address?.city); // "Seattle"
console.log(userB.address?.city); // undefined (safe! No crash)

// Also works on optional function/method calls:
const logger = {};
logger.print?.(); // No crash even though .print does not exist