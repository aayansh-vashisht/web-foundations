// Get current millisecond timestamp directly
const timestampNow = Date.now();
console.log(timestampNow); // e.g., 1790382098000

// Get millisecond timestamp from an existing Date instance
const myDate = new Date("2026-01-01T00:00:00Z");
console.log(myDate.getTime()); // 1767225600000

// Create a date directly from an existing millisecond timestamp
const restoredDate = new Date(1767225600000);
console.log(restoredDate.toISOString()); // "2026-01-01T00:00:00.000Z"

// Simple math: calculate time differences in milliseconds
const start = Date.now();
// ... simulate task ...
const elapsedMs = Date.now() - start;