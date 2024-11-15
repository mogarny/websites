"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toastTrigger = document.getElementById("liveToastBtn");
const toastLiveExample = document.getElementById("liveToast");
const pQuiz = document.getElementById("p-quiz");
const toastBody = document.getElementById("toast-body");
//@ts-ignore
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
const htmlPoinstElement = document.getElementById("points");
let points = 0;
htmlPoinstElement.innerText = `${points}`;
let countdown;
let answers = [];
const divQuiz = document.getElementsByClassName("quiz")[0];
const formCheck = document.createElement("form");
const timerRemove = document.getElementsByClassName('timer')[0];
function result() {
    timerRemove.style.display = 'none';
    pQuiz.innerHTML = `
    <p>Quiz is done!</p>
    <p>You answered correctly on ${points}/${quiz === null || quiz === void 0 ? void 0 : quiz.questions.length} questions</p>
    <a href = "my_quizzes.html">Go back to "My Quizzes"</a>
    `;
    toastTrigger === null || toastTrigger === void 0 ? void 0 : toastTrigger.classList.add("answer-none");
}
function timer() {
    const timerElement = document.getElementById("timer");
    let time = 30;
    clearInterval(countdown);
    answers = [];
    countdown = setInterval(() => {
        if (time <= 0) {
            clearInterval(countdown);
            validateAnswer();
            toastBootstrap.show();
            questionNumber++;
            formCheck.innerText = "";
            writeQuestion();
            next === null || next === void 0 ? void 0 : next.classList.add("next-none");
            toastTrigger === null || toastTrigger === void 0 ? void 0 : toastTrigger.classList.remove("answer-none");
            if (questionNumber === (quiz === null || quiz === void 0 ? void 0 : quiz.questions.length)) {
                result();
            }
        }
        else {
            if (timerElement !== null) {
                timerElement.innerText = time.toString();
                time--;
            }
        }
    }, 1000);
}
document.addEventListener("DOMContentLoaded", timer);
const question = document.getElementById("question");
const difficultyAmount = document.getElementById("difficulty-amount");
const next = document.getElementById("next");
function getURLParameters() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id;
}
const id = getURLParameters();
const quizzesStringified = localStorage.getItem("quizzes");
let questionNumber = 0;
let quizzes;
let quiz;
function writeQuestion() {
    if (quizzesStringified !== null) {
        quizzes = JSON.parse(quizzesStringified);
        const resultFind = quizzes.find((quiz) => Number(id) === quiz.id);
        if (resultFind) {
            quiz = resultFind;
        }
        else {
            throw new Error("Quiz is not found");
        }
        if (quiz === null || quiz === void 0 ? void 0 : quiz.questions[questionNumber]) {
            if (question) {
                question.innerText =
                    //@ts-ignore
                    (quiz === null || quiz === void 0 ? void 0 : quiz.questions[questionNumber].question.replaceAll('&#039;', "'").replaceAll('&rsquo;', "'").replaceAll('&quot;', "'")) || "";
                answers.push(...quiz === null || quiz === void 0 ? void 0 : quiz.questions[questionNumber].incorrect_answers, quiz === null || quiz === void 0 ? void 0 : quiz.questions[questionNumber].correct_answer);
                const shuffledAnswers = shuffle(answers);
                for (let i = 0; i < shuffledAnswers.length; i++) {
                    const input = document.createElement("input");
                    input === null || input === void 0 ? void 0 : input.classList.add("form-check-input");
                    input === null || input === void 0 ? void 0 : input.setAttribute("type", "radio");
                    input === null || input === void 0 ? void 0 : input.setAttribute("name", "radio");
                    input === null || input === void 0 ? void 0 : input.setAttribute("id", "exampleRadios3");
                    input === null || input === void 0 ? void 0 : input.setAttribute("value", shuffledAnswers[i]);
                    if (i === 0) {
                        input === null || input === void 0 ? void 0 : input.setAttribute("checked", "checked");
                    }
                    const label = document.createElement("label");
                    label === null || label === void 0 ? void 0 : label.classList.add("form-check-label");
                    label === null || label === void 0 ? void 0 : label.setAttribute("for", "exampleRadios3");
                    label.innerText = answers[i];
                    formCheck.appendChild(input);
                    formCheck.appendChild(label);
                }
                divQuiz.appendChild(formCheck);
            }
            if (difficultyAmount) {
                difficultyAmount.innerHTML = `<p>Difficulty: ${(quiz === null || quiz === void 0 ? void 0 : quiz.questions[questionNumber].difficulty) || ""}</p> <p>Number of question: ${questionNumber + 1}</p>`;
            }
            timer();
        }
    }
}
formCheck.innerText = "";
writeQuestion();
function shuffle(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}
next === null || next === void 0 ? void 0 : next.classList.add("next-none");
if (next) {
    next.onclick = () => {
        next.classList.add("next-none");
        toastTrigger === null || toastTrigger === void 0 ? void 0 : toastTrigger.classList.remove("answer-none");
        questionNumber++;
        formCheck.innerText = "";
        writeQuestion();
        timer();
        if (questionNumber === (quiz === null || quiz === void 0 ? void 0 : quiz.questions.length)) {
            result();
        }
    };
}
function validateAnswer() {
    const radio = document.getElementsByName("radio");
    for (const answer of radio) {
        if (answer.checked &&
            answer.value === quiz.questions[questionNumber].correct_answer) {
            if (toastBody) {
                toastBody.innerHTML = "<p>Correct!</p>";
                toastBody.style.background = "#45e97066";
                points++;
                htmlPoinstElement.innerText = `${points} points`;
            }
            else {
                throw new Error("toast-body is null");
            }
        }
        else if (answer.checked &&
            answer.value !== quiz.questions[questionNumber].correct_answer) {
            if (toastBody) {
                toastBody.innerHTML = `<p>Incorrect :/ The correct answer is ${quiz.questions[questionNumber].correct_answer}</p>`;
                toastBody.style.background = "#e9454566";
            }
            else {
                throw new Error("toast-body is null");
            }
        }
    }
}
if (toastTrigger) {
    toastTrigger.addEventListener("click", () => {
        validateAnswer();
        toastBootstrap.show();
        toastTrigger.classList.add("answer-none");
        next === null || next === void 0 ? void 0 : next.classList.remove("next-none");
    });
}
