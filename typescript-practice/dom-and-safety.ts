// 1. unknown vs any
function parseExternalData(rawInput: unknown): void {
    // rawInput.trim(); // Error! TypeScript prevents calling methods blindly

    if (typeof rawInput === "string") {
        console.log(rawInput.trim()); // Safe: narrowed to string
    }
}

// 2. DOM Typing and Query Selectors
const submitBtn = document.querySelector<HTMLButtonElement>("#submit-btn");
const emailInput = document.querySelector<HTMLInputElement>("#email");
const loginForm = document.querySelector<HTMLFormElement>("#login-form");

// Handling nullable elements safely
if (submitBtn) {
    submitBtn.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault();
        console.log("Button clicked!");
    });
}

if (emailInput) {
    emailInput.addEventListener("input", (event: Event) => {
        // Type assertion used sparingly when target is guaranteed
        const target = event.target as HTMLInputElement;
        console.log("Current value:", target.value);
    });
}