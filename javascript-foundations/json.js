const profile = { username: "coder101", points: 150 };

// 1. Convert Object -> JSON string (to save or send)
const jsonText = JSON.stringify(profile);
console.log(jsonText); // '{"username":"coder101","points":150}'

// 2. Convert JSON string -> JavaScript Object (to read and use)
const parsedData = JSON.parse(jsonText);
console.log(parsedData.points); // 150