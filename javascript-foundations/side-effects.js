let totalCartItems = 0;

// This function causes a side effect by modifying external state
function addItemToCart() {
    totalCartItems++; // Side effect: alters outside variable
}

addItemToCart();
console.log(totalCartItems); // 1