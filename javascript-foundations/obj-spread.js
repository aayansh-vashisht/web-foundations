const defaultPreferences = { theme: "light", showNotifications: true };
const userCustomizations = { theme: "dark" }; // User wants dark mode

// Merge defaults with custom values
const finalPreferences = {
    ...defaultPreferences,
    ...userCustomizations, // Overwrites 'theme: "light"'
    lastUpdated: "Today"
};

console.log(finalPreferences);
// { theme: "dark", showNotifications: true, lastUpdated: "Today" }