const cart = [10, 25, 15];

// accumulator starts at 0 (the initial value passed as the 2nd argument)
const totalCost = cart.reduce((acc, price) => acc + price, 0);

console.log(totalCost); // 50 (One single accumulated value)