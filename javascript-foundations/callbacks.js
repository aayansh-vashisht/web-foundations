function processUserInput(name, callback) {
    console.log(`Processing data for ${name}...`);
    // Execute the passed-in function
    callback(name);
}

const welcomeMessage = (user) => {
    console.log(`Welcome aboard, ${user}!`);
};

// Passing welcomeMessage as an argument (without parentheses!)
processUserInput("Maya", welcomeMessage);
// Output:
// "Processing data for Maya..."
// "Welcome aboard, Maya!"