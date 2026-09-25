const targetDate = new Date("2026-09-26T14:30:00Z");

// US English (MM/DD/YYYY, 12-hour clock)
const usDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC"
}).format(targetDate);

console.log(usDate);
// "Sep 26, 2026, 2:30 PM"

// French (DD/MM/YYYY, 24-hour clock)
const frDate = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC"
}).format(targetDate);

console.log(frDate);
// "26 sept. 2026, 14:30"

const customFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",   // "Saturday"
  day: "numeric",    // "26"
  month: "long",     // "September"
  year: "numeric"    // "2026"
});

console.log(customFormatter.format(targetDate)); 
// "Saturday 26 September 2026"