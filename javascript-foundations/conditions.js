const score = 67;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 70) {
  console.log("Grade: B");
} else {
  console.log("Grade: C");
}

// Ternary operator: quick one-line shorthand
const status = score >= 70 ? "Pass" : "Fail";