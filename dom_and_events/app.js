/**
 * 03_dom_and_events/app.js
 * DOM Selection, Element Creation, Event Handling, and Validation
 */

// 1. DOM Selection
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const errorMessage = document.querySelector("#error-message");
const taskList = document.querySelector("#task-list");

// 2. Form Submission & Input Validation
taskForm.addEventListener("submit", (event) => {
  // Prevent the default browser reload on submit
  event.preventDefault();

  const taskText = taskInput.value.trim();

  // Basic Validation Rule
  if (taskText.length < 3) {
    showError();
    return;
  }

  hideError();
  createTaskElement(taskText);

  // Clear input
  taskInput.value = "";
  taskInput.focus();
});

// Helper validation functions (classList manipulation)
function showError() {
  errorMessage.classList.remove("hidden");
}

function hideError() {
  errorMessage.classList.add("hidden");
}

// 3. Creating, Modifying, and Removing Elements
function createTaskElement(text) {
  // Create container li
  const li = document.createElement("li");
  li.classList.add("task-item");

  // Create text span
  const textSpan = document.createElement("span");
  textSpan.textContent = text;

  // Toggle completed state on click
  textSpan.addEventListener("click", () => {
    textSpan.classList.toggle("task-completed");
  });

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    li.remove(); // Removes element directly from DOM
  });

  // Append elements to DOM tree
  li.append(textSpan, deleteBtn);
  taskList.append(li);
}
