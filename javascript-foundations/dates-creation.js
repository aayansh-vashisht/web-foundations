// Current date and time
const now = new Date();

// From an ISO date string (standard UTC format: YYYY-MM-DDTHH:mm:ss.sssZ)
const releaseDate = new Date("2026-05-15T10:30:00Z");

// From specific components: (year, monthIndex, day, hours, minutes, seconds)
// Note: Month 4 is May (0 = Jan, 1 = Feb, 2 = Mar, 3 = Apr, 4 = May)
const meetingDate = new Date(2026, 4, 15, 14, 0, 0);

console.log(now.toISOString());        // e.g., "2026-09-26T00:00:00.000Z"
console.log(meetingDate.toString());   // Local timezone string representation