// Standard Number Formatting
const population = 1250450.75;

// US format: comma for thousands, period for decimals
console.log(new Intl.NumberFormat("en-US").format(population));
// "1,250,450.75"

// German format: period for thousands, comma for decimals
console.log(new Intl.NumberFormat("de-DE").format(population));
// "1.250.450,75"

// Indian format: uses lakhs and crores grouping (12,50,450.75)
console.log(new Intl.NumberFormat("en-IN").format(population));
// "12,50,450.75"

// Currency Formatting
const price = 49.99;

// US Dollars ($49.99)
const usdFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
}).format(price);

console.log(usdFormat); // "$49.99"

// Euros formatted for Germany (49,99 €)
const eurFormat = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
}).format(price);

console.log(eurFormat); // "49,99 €"

// Japanese Yen (¥50 - no fractional decimals)
console.log(new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY"
}).format(5000));
// "￥5,000"

// Percentages & Unit Formatting
// Percentage (0.85 -> 85%)
const discountFormatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1
});
console.log(discountFormatter.format(0.854)); // "85.4%"

// Measurement units (kilograms, liters, miles-per-hour)
const speedFormatter = new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "kilometer-per-hour",
    unitDisplay: "short"
});
console.log(speedFormatter.format(120)); // "120 km/h"

// Compact Notation (Social Metrics / Abbreviated Views)
const subscribers = 2450000;

const compactFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short"
});

console.log(compactFormatter.format(subscribers)); // "2.5M"