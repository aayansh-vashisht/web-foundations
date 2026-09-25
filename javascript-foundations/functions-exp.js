// sayGoodbye("Alice"); // ReferenceError: Cannot access 'sayGoodbye' before initialization

const sayGoodbye = function (name) {
    return `Goodbye, ${name}!`;
};

console.log(sayGoodbye("Alice")); // Output: "Goodbye, Alice!"