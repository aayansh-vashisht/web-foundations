// --- Primitives ---
const username: string = "Jordan";
const score: number = 95.5;
const isLoggedIn: boolean = true;

// --- Null & Undefined ---
let pendingAction: null = null;
let unassignedNote: undefined = undefined;

// --- Arrays (List of items of the same type) ---
const tags: string[] = ["typescript", "beginner", "tutorial"];
const scores: number[] = [10, 20, 30];

// --- Tuples (Fixed length and specific order) ---
// Position 0 MUST be a string (HTTP status text), Position 1 MUST be a number (status code)
const responseStatus: [string, number] = ["OK", 200];

// --- Object Types (Defines property names and types) ---
type UserProfile = {
  id: number;
  username: string;
  isActive: boolean;
  role?: string; // The '?' means this property is optional
};

const userAccount: UserProfile = {
  id: 101,
  username: "Jordan",
  isActive: true,
  // 'role' is optional, so leaving it out is valid
};

console.log(username, score, isLoggedIn, responseStatus, userAccount);