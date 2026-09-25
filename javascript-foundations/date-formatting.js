const eventDate = new Date("2026-09-26T15:30:00Z");

// 1. Shorthand formatting using .toLocaleDateString()
// Formats according to US convention: MM/DD/YYYY
console.log(eventDate.toLocaleDateString("en-US"));
// "9/26/2026"

// Formats according to British convention: DD/MM/YYYY
console.log(eventDate.toLocaleDateString("en-GB"));
// "26/09/2026"


// 2. Custom configuration using new Intl.DateTimeFormat()
const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",   // "Saturday"
    year: "numeric",   // "2026"
    month: "long",     // "September"
    day: "numeric",    // "26"
    hour: "2-digit",   // "03" PM
    minute: "2-digit", // "30"
    timeZone: "UTC"    // Lock output to specific timezone
});

console.log(formatter.format(eventDate));
// "Saturday, September 26, 2026, 03:30 PM"


// 3. Different languages with zero extra work
const germanFormatter = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "UTC"
});

console.log(germanFormatter.format(eventDate));
// "Samstag, 26. September 2026 um 15:30"