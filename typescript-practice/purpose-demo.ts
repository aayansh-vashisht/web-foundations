// 1. Clear contract: The function requires a name (string) and age (number)
function createWelcomeMessage(name: string, age: number): string {
  return `Hello, ${name}! You are ${age} years old.`;
}

// Correct usage:
const greeting = createWelcomeMessage("Alex", 25);
console.log(greeting);

// TypeScript catches this mistake BEFORE running:
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.
// createWelcomeMessage("Alex", "twenty-five");
