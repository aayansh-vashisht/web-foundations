// Assume HTML: <button id="save-btn">Save</button>
const button = document.querySelector("#save-btn");

button.addEventListener("click", (event) => {
  console.log("Button was clicked!");
});