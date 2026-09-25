const users = [
    { id: 1, name: "Sara" },
    { id: 2, name: "Leon" },
    { id: 3, name: "Leon" }
];

const match = users.find((user) => user.name === "Leon");
console.log(match); // { id: 2, name: "Leon" } (One item)