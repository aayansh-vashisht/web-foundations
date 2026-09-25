const userSettings = {
    animationSpeed: 0,    // A valid user choice!
    darkMode: false,      // A valid user choice!
    customTitle: null     // Intentionally empty
};

// The problem with || (Logical OR):
console.log(userSettings.animationSpeed || 300); // 300 (Bug! 0 is falsy, so it was replaced)

// The solution with ?? (Nullish Coalescing):
console.log(userSettings.animationSpeed ?? 300); // 0 (Preserved!)
console.log(userSettings.darkMode ?? true);       // false (Preserved!)
console.log(userSettings.customTitle ?? "Guest"); // "Guest" (Replaced because it is null)