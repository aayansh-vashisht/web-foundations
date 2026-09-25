function authenticateUser() {
    const secretToken = "xyz_987";
    var sessionId = 101;
    console.log(secretToken); // Works fine here
}

authenticateUser();

// Outside the function:
// console.log(secretToken); // ReferenceError: secretToken is not defined
// console.log(sessionId);   // ReferenceError: sessionId is not defined