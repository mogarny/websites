const createAButton: HTMLElement | null = document.getElementById("create");
const section: HTMLElement = document.getElementsByTagName("section")[0];

export interface Question {
    category: string;
    correct_answer: string;
    difficulty: "easy" | "medium" | "hard";
    incorrect_answers: string[];
    question: string;
    type: "multiple" | "boolean";
}

export interface Quiz {
    questions: Question[];
    id?: number;
    name?: string;
}

if (createAButton !== null) {
    createAButton.onclick = () => {
        const triviaAmount = document.getElementById(
            "trivia_amount"
        ) as HTMLInputElement;
        const categorySelect = document.getElementById(
            "category"
        ) as HTMLSelectElement;
        const difficultySelect = document.getElementById(
            "difficulty"
        ) as HTMLSelectElement;
        const triviaTypeSelect = document.getElementById(
            "trivia_type"
        ) as HTMLSelectElement;

        if (
            triviaAmount &&
            categorySelect &&
            difficultySelect &&
            triviaTypeSelect
        ) {
            const amount: string = `amount=${triviaAmount.value}`;
            const category: string = `category=${categorySelect.value}`;
            const difficulty: string = `difficulty=${difficultySelect.value}`;
            const type: string = `type=${triviaTypeSelect.value}`;

            let url: string = `https://opentdb.com/api.php?${amount}`;

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
                    } else if (data.response_code === 5 || data.response_code === 4) {
                        section.innerHTML = `
                        <p>You make too many requests. Please try again</p>
                        `;
                        window.location.reload();
                    }

                    const quiz: Quiz = {
                        questions: data.results
                    };
                    const oldStringified = localStorage.getItem("quizzes");
                    let quizzes: Quiz[];

                    if (oldStringified !== null) {
                        quizzes = JSON.parse(oldStringified);
                        quizzes.push(quiz);
                    } else {
                        quizzes = [quiz];
                    }

                    const nameQuiz = document.getElementById(
                        "name-quiz"
                    ) as HTMLInputElement | null;

                    if (nameQuiz?.value !== '') {
                        quiz.name = nameQuiz!.value;
                    } else {
                        quiz.name = `${quizzes.length} quiz`
                    }   

                    quiz.id = quizzes.length;

                    const quizJSON: string = JSON.stringify(quizzes);
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
