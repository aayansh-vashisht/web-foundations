const questions = [
  {
    question: "Which keyword declares a constant variable?",
    options: ["var", "let", "const", "static"],
    answer: "const"
  },
  {
    question: "Which method creates a new transformed array?",
    options: ["forEach", "map", "filter", "find"],
    answer: "map"
  },
  {
    question: "Which data type is NOT primitive?",
    options: ["Boolean", "String", "Object", "Number"],
    answer: "Object"
  }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.querySelector("#question-text");
const optionsContainer = document.querySelector("#options-container");
const quizBox = document.querySelector("#quiz-box");
const resultBox = document.querySelector("#result-box");
const scoreText = document.querySelector("#score-text");
const restartBtn = document.querySelector("#restart-btn");

function loadQuestion() {
  const currentQ = questions[currentIndex];
  questionEl.textContent = `${currentIndex + 1}. ${currentQ.question}`;
  optionsContainer.innerHTML = "";

  // Dynamically create option buttons
  currentQ.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => checkAnswer(opt));
    optionsContainer.append(btn);
  });
}

function checkAnswer(selectedOption) {
  if (selectedOption === questions[currentIndex].answer) {
    score++;
  }
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${questions.length}!`;
}

restartBtn.addEventListener("click", () => {
  score = 0;
  currentIndex = 0;
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
});

// Initial load
loadQuestion();