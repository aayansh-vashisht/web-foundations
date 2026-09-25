const user = {
    name: "Alex",
    "account-type": "Premium" // Key with a hyphen
};

// 1. Dot notation
console.log(user.name); // "Alex"

// 2. Bracket notation (literal string)
console.log(user["account-type"]); // "Premium"

// 3. Bracket notation (dynamic variable)
const fieldToRead = "name";
console.log(user[fieldToRead]); // "Alex"