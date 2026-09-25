const user = {
  name: "Alex",
  age: 26,
  isLoggedIn: true,
  greet() {
    return `Hi, I'm ${this.name}`;
  }
};

console.log(user.name);    // "Alex"
console.log(user.greet()); // "Hi, I'm Alex"