// Throwing a standard Error with a custom message
function verifyAge(age) {
    if (age < 0) {
        throw new Error("Age cannot be negative."); // Custom error message
    }
    if (age < 18) {
        throw new Error("User must be at least 18 years old.");
    }
    return "Access granted";
}

verifyAge(-5); // Uncaught Error: Age cannot be negative.