class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function registerEmail(email) {
    if (!email.includes("@")) {
        throw new ValidationError("Please provide a valid email address.");
    }
    return "Registered!";
}

try {
    registerEmail("invalid-email-address");
} catch (err) {
    if (err instanceof ValidationError) {
        console.error(`Validation Issue: ${err.message}`);
    } else {
        console.error(`Unknown system error: ${err.message}`);
    }
}