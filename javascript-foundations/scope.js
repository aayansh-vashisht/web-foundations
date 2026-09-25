const globalMessage = "Visible everywhere";

function checkScope() {
  const secret = "Only visible inside this function";
  console.log(globalMessage); // Works
  console.log(secret);        // Works
}

checkScope();
// console.log(secret); // Error: secret is not defined