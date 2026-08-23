// 1. Keep track of the counter state
let count = 0;

// 2. Select DOM elements
const counterDisplay = document.querySelector("#counter-value");
const btnDecrease = document.querySelector("#btn-decrease");
const btnReset = document.querySelector("#btn-reset");
const btnIncrease = document.querySelector("#btn-increase");

// 3. Helper function to update text and color
function updateDisplay() {
  counterDisplay.textContent = count;
  if (count > 0) counterDisplay.style.color = "#16a34a";
  else if (count < 0) counterDisplay.style.color = "#dc2626";
  else counterDisplay.style.color = "#1e293b";
}

// 4. Attach event listeners
btnIncrease.addEventListener("click", () => {
  count++;
  updateDisplay();
});

btnDecrease.addEventListener("click", () => {
  count--;
  updateDisplay();
});

btnReset.addEventListener("click", () => {
  count = 0;
  updateDisplay();
});