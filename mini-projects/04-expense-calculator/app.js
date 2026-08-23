let expenses = [];

const form = document.querySelector("#expense-form");
const descInput = document.querySelector("#desc");
const amountInput = document.querySelector("#amount");
const expenseList = document.querySelector("#expense-list");
const totalAmountDisplay = document.querySelector("#total-amount");

function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.desc}</span>
      <span>$${item.amount.toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteExpense(${index})">✕</button>
    `;
    expenseList.append(li);
  });

  // Calculate total using Array.prototype.reduce
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  totalAmountDisplay.textContent = total.toFixed(2);
}

// Window-scoped delete helper for HTML onclick attribute
window.deleteExpense = function(index) {
  expenses.splice(index, 1);
  renderExpenses();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!desc || isNaN(amount) || amount <= 0) return;

  expenses.push({ desc, amount });
  
  // Clear inputs
  descInput.value = "";
  amountInput.value = "";
  
  renderExpenses();
});