const tasks = [
    { title: "Code", done: true },
    { title: "Review", done: false }
];

const hasIncomplete = tasks.some((task) => !task.done);
console.log(hasIncomplete); // true (Boolean)