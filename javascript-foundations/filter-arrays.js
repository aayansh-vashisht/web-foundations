const prices = [15, 80, 45, 120, 25];
const expensive = prices.filter((price) => price > 50);

console.log(expensive); // [80, 120] (New array)
console.log(prices);    // [15, 80, 45, 120, 25] (Original unchanged)