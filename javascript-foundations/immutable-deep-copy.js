// --- Immutable Updates (Pattern) ---
const baseProfile = { username: "dev99", role: "user" };

// Create a new object with updated role rather than mutating baseProfile
const updatedProfile = { ...baseProfile, role: "admin" };
console.log(baseProfile.role);    // "user"
console.log(updatedProfile.role); // "admin"

// --- Deep Copying (Complete Independence) ---
// For deeply nested objects, use the native modern standard: structuredClone()
const originalState = {
    user: "Sam",
    settings: { notifications: true }
};

const deepClonedState = structuredClone(originalState);
deepClonedState.settings.notifications = false;

console.log(originalState.settings.notifications); // true (completely safe!)