// ==========================================
// 1. JSON (JavaScript Object Notation)
// ==========================================

const userPreferences = {
  theme: "dark",
  fontSize: 16,
  notificationsEnabled: true
};

// JSON.stringify: Converts JS objects/arrays into a JSON string
const jsonString = JSON.stringify(userPreferences);
console.log("JSON String:", jsonString); // '{"theme":"dark","fontSize":16,...}'

// JSON.parse: Converts a JSON string back into a JS object
const parsedObject = JSON.parse(jsonString);
console.log("Parsed Theme:", parsedObject.theme); // "dark"


// ==========================================
// 2. LOCALSTORAGE BASICS
// ==========================================

// LocalStorage stores data as KEY-VALUE strings that persist across page reloads.

// A. Saving strings
localStorage.setItem("username", "developer_jane");

// B. Saving complex objects (Must be converted to string first)
const cart = [
  { item: "Laptop Stand", qty: 1 },
  { item: "USB Hub", qty: 2 }
];
localStorage.setItem("user_cart", JSON.stringify(cart));

// C. Reading data at page load
const storedUsername = localStorage.getItem("username");
console.log("Retrieved Username:", storedUsername);

const rawCartData = localStorage.getItem("user_cart");
// Safely parse or fallback to an empty array
const savedCart = rawCartData ? JSON.parse(rawCartData) : [];
console.log("Retrieved Cart Count:", savedCart.length);

// D. Deleting stored data
localStorage.removeItem("username"); // Deletes single key
// localStorage.clear();             // Clears everything in storage for this domain
