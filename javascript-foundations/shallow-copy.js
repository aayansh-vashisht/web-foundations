const originalUser = {
    name: "Aayansh",
    preferences: { theme: "dark" } // Nested reference
};

// Shallow copy
const clonedUser = { ...originalUser };

// Changing top-level property: Safe
clonedUser.name = "Vikram";
console.log(originalUser.name); // "Aayansh" (original remains untouched)

// Changing nested property: Mutates original!
clonedUser.preferences.theme = "light";
console.log(originalUser.preferences.theme); // "light" (shared reference!)