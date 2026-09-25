const inventory = {
    apples: 12,
    bananas: 8,
    oranges: 15
};

// 1. Get all keys
console.log(Object.keys(inventory));
// ["apples", "bananas", "oranges"]

// 2. Get all values (great for math!)
const totalStock = Object.values(inventory).reduce((acc, count) => acc + count, 0);
console.log(totalStock);
// 35

// 3. Get key-value pairs (great for loops)
for (const [fruit, qty] of Object.entries(inventory)) {
    console.log(`We have ${qty} ${fruit} in stock.`);
}
// "We have 12 apples in stock."
// "We have 8 bananas in stock."
// "We have 15 oranges in stock."