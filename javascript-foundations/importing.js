// app.js

// 1. Importing named exports (must use curly braces)
import { add, multiply, PI } from "./utils/mathUtils.js";

// 2. Importing a default export (no curly braces, custom name allowed)
import User from "./models/User.js";

const newUser = new User("Alex", "alex@example.com");
console.log(newUser.getDetails()); // "Alex (alex@example.com)"

console.log(add(10, 5));           // 15
console.log(multiply(2, PI));      // 6.28318