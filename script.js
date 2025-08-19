const questions = [
    {
        question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
        answers: [
            { text: "120 meters", correct: false },
            { text: "180 meters", correct: false },
            { text: "150 meters", correct: true },
            { text: "200 meters", correct: false },
        ]
    },
    {
        question: "If a car travels 100 km in 2 hours, what is its average speed?",
        answers: [
            { text: "40 km/hr", correct: false },
            { text: "50 km/hr", correct: true },
            { text: "60 km/hr", correct: false },
            { text: "45 km/hr", correct: false },
        ]
    },
    {
        question: "What is 20% of 250?",
        answers: [
            { text: "50", correct: true },
            { text: "25", correct: false },
            { text: "100", correct: false },
            { text: "20", correct: false },
        ]
    },
    {
        question: "If a person buys a book for $10 and sells it for $12, what is the profit percentage?",
        answers: [
            { text: "10%", correct: false },
            { text: "20%", correct: true },
            { text: "2%", correct: false },
            { text: "25%", correct: false },
        ]
    },
    {
        question: "The sum of three consecutive integers is 21. What are the integers?",
        answers: [
            { text: "5, 6, 7", correct: false },
            { text: "6, 7, 8", correct: true },
            { text: "7, 8, 9", correct: false },
            { text: "4, 5, 6", correct: false },
        ]
    },
    {
        question: "A and B can do a piece of work in 10 days, B and C in 15 days, and A and C in 20 days. How long will B alone take to do it?",
        answers: [
            { text: "12 days", correct: false },
            { text: "15 days", correct: false },
            { text: "20 days", correct: false },
            { text: "24 days", correct: true },
        ]
    },
    {
        question: "A pipe can fill a tank in 10 hours. Another pipe can empty the same tank in 15 hours. If both pipes are opened, in how many hours will the tank be full?",
        answers: [
            { text: "20 hours", correct: false },
            { text: "30 hours", correct: true },
            { text: "25 hours", correct: false },
            { text: "10 hours", correct: false },
        ]
    },
    {
        question: "What is the simple interest on $5,000 at 5% per annum for 3 years?",
        answers: [
            { text: "$500", correct: false },
            { text: "$750", correct: true },
            { text: "$1,000", correct: false },
            { text: "$600", correct: false },
        ]
    },
    {
        question: "If 5 workers can build a wall in 20 hours, how many hours will it take 10 workers to build the same wall?",
        answers: [
            { text: "10 hours", correct: true },
            { text: "5 hours", correct: false },
            { text: "20 hours", correct: false },
            { text: "15 hours", correct: false },
        ]
    },
    {
        question: "What is the median of the following set of numbers: 12, 15, 11, 13, 17?",
        answers: [
            { text: "11", correct: false },
            { text: "13", correct: true },
            { text: "14", correct: false },
            { text: "15", correct: false },
        ]
    }
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

    currentQuestion.answers.forEach(answer => {
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
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
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
