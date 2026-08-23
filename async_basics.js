// ==========================================
// 1. SYNCHRONOUS VS ASYNCHRONOUS
// ==========================================

// Synchronous code blocks execution; Asynchronous runs in the background
console.log("1. Program starts");

setTimeout(() => {
  console.log("2. Inside setTimeout (executed after 1000ms)");
}, 1000);

console.log("3. Program finishes main call stack");


// ==========================================
// 2. PROMISES
// ==========================================

// A Promise represents an eventual completion (resolve) or failure (reject)
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, username: "dev_user" });
      } else {
        reject(new Error("Invalid User ID"));
      }
    }, 500);
  });
}

// Handling with .then() and .catch()
fetchUserData(1)
  .then((data) => console.log("Promise Resolved:", data))
  .catch((err) => console.error("Promise Error:", err.message));


// ==========================================
// 3. MODERN ASYNC / AWAIT
// ==========================================

// async/await is syntactic sugar over Promises, making code look synchronous
async function loadDashboard() {
  try {
    console.log("Loading dashboard data...");
    const user = await fetchUserData(42);
    console.log(`Loaded user: ${user.username}`);
  } catch (error) {
    console.error("Failed to load dashboard:", error.message);
  }
}

loadDashboard();
