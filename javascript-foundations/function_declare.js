// Calling the function BEFORE it is declared works because of hoisting:
sayHello("Alice"); // Output: "Hello, Alice!"

function sayHello(name) {
    return `Hello, ${name}!`;
}