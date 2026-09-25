const scores = [65, 82, 94, 73];

const firstA = scores.findIndex((score) => score >= 90);
console.log(firstA); // 2 (Index of 94)

const failing = scores.findIndex((score) => score < 50);
console.log(failing); // -1 (Not found)