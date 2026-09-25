const user1 = { id: 1, name: "Sam" };
const user2 = { id: 1, name: "Sam" };

// Quick method for simple, un-nested objects (convert to JSON strings):
const areEqual = JSON.stringify(user1) === JSON.stringify(user2);
console.log(areEqual); // true

// Explicit property comparison (most reliable in production):
function areUsersEqual(a, b) {
    return a.id === b.id && a.name === b.name;
}
console.log(areUsersEqual(user1, user2)); // true