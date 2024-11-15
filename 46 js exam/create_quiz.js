"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createAButton = document.getElementById("create");
const section = document.getElementsByTagName("section")[0];
if (createAButton !== null) {
    createAButton.onclick = () => {
        const triviaAmount = document.getElementById("trivia_amount");
        const categorySelect = document.getElementById("category");
        const difficultySelect = document.getElementById("difficulty");
        const triviaTypeSelect = document.getElementById("trivia_type");
        if (triviaAmount &&
            categorySelect &&
            difficultySelect &&
            triviaTypeSelect) {
            const amount = `amount=${triviaAmount.value}`;
            const category = `category=${categorySelect.value}`;
            const difficulty = `difficulty=${difficultySelect.value}`;
            const type = `type=${triviaTypeSelect.value}`;
            let url = `https://opentdb.com/api.php?${amount}`;
            if (categorySelect.value !== "any") {
                url += `${category}`;
            }
            if (difficultySelect.value !== "any") {
                url += `${difficulty}`;
            }
            if (triviaTypeSelect.value !== "any") {
                url += `${type}`;
            }
            console.log(url);
            fetch(url)
                .then((response) => {
                return response.json();
            })
                .then((data) => {
                if (data.response_code === 2 || data.response_code === 1) {
                    section.innerHTML = `
                        <p>There are not enough questions in this category in our database. We are really sorry..</p>
                        `;
                    throw new Error("try again. not enough questions");
                }
                else if (data.response_code === 5 || data.response_code === 4) {
                    section.innerHTML = `
                        <p>You make too many requests. Please try again</p>
                        `;
                    window.location.reload();
                }
                const quiz = {
                    questions: data.results
                };
                const oldStringified = localStorage.getItem("quizzes");
                let quizzes;
                if (oldStringified !== null) {
                    quizzes = JSON.parse(oldStringified);
                    quizzes.push(quiz);
                }
                else {
                    quizzes = [quiz];
                }
                const nameQuiz = document.getElementById("name-quiz");
                if ((nameQuiz === null || nameQuiz === void 0 ? void 0 : nameQuiz.value) !== '') {
                    quiz.name = nameQuiz.value;
                }
                else {
                    quiz.name = `${quizzes.length} quiz`;
                }
                quiz.id = quizzes.length;
                const quizJSON = JSON.stringify(quizzes);
                localStorage.setItem("quizzes", quizJSON);
                if (section !== undefined) {
                    section.innerHTML = `<div>Quiz was successfully ceated!</div>
                <a href='./my_quizzes.html'>You can go and see your quizzes →</a>`;
                }
            })
                .catch((error) => {
                console.error("Problem with the fetch operation:", error);
            });
        }
    };
}
