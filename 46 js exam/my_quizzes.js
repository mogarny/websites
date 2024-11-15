"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quizzesStringified = localStorage.getItem("quizzes");
if (quizzesStringified !== null) {
    const quizzes = JSON.parse(quizzesStringified);
    for (let i = 0; i < quizzes.length; i++) {
        const createdQuiz = document.createElement("div");
        const containerCreatedQuizzes = document.getElementById("container-created-quizzes");
        const header = document.createElement("h5");
        const cardButton = document.createElement("a");
        const deleteBtn = document.createElement("button");
        const cardBody = document.createElement("div");
        const colors = [
            "secondary",
            "success",
            "danger",
            "warning",
            "info",
            "light",
            "dark",
        ];
        if (containerCreatedQuizzes !== null) {
            createdQuiz.classList.add("card", `text-bg-${colors[i % colors.length]}`, "mb-3", "created-quiz", "g-col-6", "g-col-md-4");
            createdQuiz.setAttribute("id", `${quizzes[i].id}`);
            cardButton.setAttribute("href", `quiz.html?id=${quizzes[i].id}`);
            cardButton.classList.add("btn", "btn-primary");
            deleteBtn.innerText = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.setAttribute("quiz-id", `${quizzes[i].id}`);
            deleteBtn.addEventListener("click", deleteQuiz);
            cardBody.classList.add("card-body");
            header.classList.add("card-title");
            cardButton.innerText = "Go to quiz →";
            if (quizzes[i].name !== "") {
                header.innerText = `${quizzes[i].name}`;
            }
            containerCreatedQuizzes.appendChild(createdQuiz);
            cardBody.appendChild(header);
            cardBody.appendChild(cardButton);
            cardBody.appendChild(deleteBtn);
            createdQuiz.appendChild(cardBody);
        }
        else {
            console.log("here is the problem");
        }
        function deleteQuiz(event) {
            const button = event.target;
            let quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
            const deleteIndex = quizzes.findIndex((q) => {
                var _a;
                return q.id === +((_a = event.target) === null || _a === void 0 ? void 0 : _a.getAttribute('quiz-id'));
            });
            quizzes.splice(deleteIndex, 1);
            localStorage.setItem('quizzes', JSON.stringify(quizzes));
            window.location.reload();
        }
    }
}
