const employee = {
    id: 101,
    profile: {
        fullName: "Jordan Lee",
        contact: { email: "jordan@example.com" }
    }
};

// Reach inside 'profile' to get 'fullName', and inside 'contact' to get 'email'
const {
    profile: {
        fullName,
        contact: { email }
    }
} = employee;

console.log(fullName); // "Jordan Lee"
console.log(email);    // "jordan@example.com"