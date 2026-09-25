const bankAccount = {
    owner: "Morgan",
    balance: 500,

    // Concise method syntax
    deposit(amount) {
        this.balance += amount;
        return `Deposited $${amount}. New balance: $${this.balance}`;
    },

    getBalance() {
        return `${this.owner}'s balance is $${this.balance}`;
    }
};

console.log(bankAccount.deposit(150)); // "Deposited $150. New balance: $650"
console.log(bankAccount.getBalance()); // "Morgan's balance is $650"