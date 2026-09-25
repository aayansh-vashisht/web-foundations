// Impure Function (relies on outside state and mutates input)
const taxRate = 0.08;
function calculateTotalImpure(cart) {
    cart.total = cart.price + cart.price * taxRate; // Mutating input + using external state
    return cart.total;
}

// Pure Function (predictable, self-contained, creates new data instead of mutating)
function calculateTotalPure(price, rate) {
    return price + price * rate;
}

console.log(calculateTotalPure(100, 0.08)); // Always returns 108
console.log(calculateTotalPure(100, 0.08)); // Always returns 108