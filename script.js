const questions = [
  {
    question: "How long did dinosaurs live on the earth?",
    answers: [
      { text: "200+ million years", correct: false },
      { text: "150-200 million years", correct: true },
      { text: "100-150 million years", correct: false },
      { text: "50-100 million years", correct: false },
    ],
  },
  {
    question: "Which flies a green, white, and orange (in that order) tricolor flag?",
    answers: [
      { text: "France", correct: false },
      { text: "Italy", correct: false },
      { text: "Ivory Coast", correct: false },
      { text: "Ireland", correct: true },
    ],
  },
  {
    question: "Which app has the most total users?",
    answers: [
      { text: "Tiktok", correct: false },
      { text: "Snapchat", correct: false },
      { text: "Instagram", correct: true },
      { text: "X", correct: false },
    ],
  },
  {
    question: "The fear of insects is known as what?",
    answers: [
      { text: "Arachnophobia", correct: false },
      { text: "Ailurophobia", correct: false },
      { text: "Entomophobia", correct: true },
      { text: "Agoraphobia", correct: false },
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
