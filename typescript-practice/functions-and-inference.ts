// 1. Good Type Inference
const count = 5; // Inferred as 'number' automatically
const username = "Sarah"; // Inferred as 'string' automatically

// 2. Parameters and Return Types
function add(a: number, b: number): number {
  return a + b;
}

// 3. Optional (?) and Default (=) Parameters
function greetUser(name: string, title?: string, greeting: string = "Hello"): string {
  if (title) {
    return `${greeting}, ${title} ${name}!`;
  }
  return `${greeting}, ${name}!`;
}

// 4. Callback Functions
function processItems(items: string[], callback: (item: string) => void): void {
  for (const item of items) {
    callback(item);
  }
}

// 5. Asynchronous Functions
async function fetchUserScore(userId: number): Promise<number> {
  // Simulating an API call
  return 100;
}