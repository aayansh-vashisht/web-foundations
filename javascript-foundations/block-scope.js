if (true) {
    const blockItem = "I stay inside";
    let blockScore = 50;
    var leakingVar = "I escape!";
}

// console.log(blockItem);  // ReferenceError: blockItem is not defined
// console.log(blockScore); // ReferenceError: blockScore is not defined
console.log(leakingVar);    // "I escape!" (var ignores block boundaries)