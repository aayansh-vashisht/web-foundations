function createCounter() {
    let count = 0; // Private variable trapped inside createCounter

    // Returning the inner function forms a closure over 'count'
    return function () {
        count++;
        return count;
    };
}

// createCounter() finishes execution right here and its execution context ends:
const counterA = createCounter();
const counterB = createCounter(); // Has its own separate closure backpack

console.log(counterA()); // 1
console.log(counterA()); // 2
console.log(counterA()); // 3

// counterB remains completely independent:
console.log(counterB()); // 1