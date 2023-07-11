const questions = [
  {
    question: "Who is the best fortnite player in Lynbrook?",
    answers: [
      { text: "Tommyboi4", correct: false },
      { text: "lemmmestop", correct: true },
      { text: "JajajaTacos", correct: false },
      { text: "Flac0Guap0", correct: false },
    ],
  },
  {
    question: "Who is the best looking person in Lynbrook?",
    answers: [
      { text: "Tommyboi4", correct: false },
      { text: "lemmmestop", correct: false },
      { text: "JajajaTacos", correct: false },
      { text: "Flac0Guap0", correct: true },
    ],
  },
  {
    question: "Who would probably give their phone number to anyone?",
    answers: [
      { text: "mymutha", correct: false },
      { text: "myfatha", correct: false },
      { text: "mysista", correct: true },
      { text: "yabrotha", correct: false },
    ],
  },
  {
    question: "What is the tastiest candy out of the following options?",
    answers: [
      { text: "Skittles", correct: false },
      { text: "Sour Straws", correct: false },
      { text: "Gummy Clusters", correct: true },
      { text: "Mike & Ikes", correct: false },
    ],
  },
  {
    question: "What street does the muffin man live on?",
    answers: [
      { text: "Cinnabon Road", correct: false },
      { text: "Finster Place", correct: false },
      { text: "Drury Lane", correct: true },
      { text: "Muffintop Corner", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
