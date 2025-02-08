//adding questions
const questions = [
    {
        question: "Which of the following colors contain equal amounts of RGB?",
        answers: [
            { text: "White", correct: "false" },
            { text: "Gray", correct: "false" },
            { text: "Black", correct: "false" },
            { text: "All of the above", correct: "true" },
        ]
    },
    {
        question: "What is the tag used to render on a webpage?",
        answers: [
            { text: "img", correct: "true" },
            { text: "src", correct: "false" },
            { text: "image", correct: "false" },
            { text: "None of the above", correct: "false" },
        ]
    },
    {
        question: "Which attribute used to provide a unique name to HTML element?",
        answers: [
            { text: "id", correct: "true" },
            { text: "class", correct: "false" },
            { text: "type", correct: "false" },
            { text: "button", correct: "false" },
        ]
    },
    {
        question: "What is the smallest header in HTML by default?",
        answers: [
            { text: "h1", correct: "false" },
            { text: "h6", correct: "true" },
            { text: "h3", correct: "false" },
            { text: "h4", correct: "false" },
        ]
    },
    {
        question: "Which if of the following is true about HTML tags?",
        answers: [
            { text: "Are case sensitive", correct: "false" },
            { text: "Are not case sensitive", correct: "true" },
            { text: "Are in uppercase", correct: "false" },
            { text: "Are in lowercase", correct: "false" },
        ]
    },
];


const questionElement = document.getElementById("question");
const answerbutton = document.getElementById("answerbutton");
const nextbutton = document.getElementById("next-btn");
const circularProgress = document.querySelector(".circular-progress");
const progressValue = document.querySelector(".progress-value");

let currentQuestionIndex = 0;
let score = 0;


function Quiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    startQuestion();
}

function startQuestion() {
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetstate() {
    nextbutton.style.display = "none";
    while (answerbutton.firstChild) {
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";
}



function showScore() {
    resetstate();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! `;
    let progressStartValue = 0;
    let progressEndValue = (score / questions.length) * 100;
    let speed = 100;

    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`
        circularProgress.style.background = `conic-gradient(#001e4d ${progressStartValue * 3.6}deg, #ededed 0deg)`
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
        console.log(progressStartValue);
    }, speed);
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        startQuestion();
    } else {
        showScore();
        // displayCircularProgress();
    }
}
nextbutton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        Quiz();
    }
});
Quiz();