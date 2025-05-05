const questions = [
    {
        question: "1. What's the capital of France?",
        answers: [
            {text:"Paris", correct:true},
            {text: "Madrid", correct:false},
            {text: "Berlin", correct:false},
            {text: "Rome", correct: false}
        ]
    },
    {
        question: "Which Planet is known as Red Planet?",
        answers: [
            {text: "Mercury", correct: false},
            {text: "Venus", correct: false},
            {text: "Mars", correct : true},
            {text: "Neptune", correct : false}
        ]
    },
    {
        question: "What is the largest organ in the human body?",
        answers: [
            { text: "Heart", correct: false },
            { text: "Skin", correct: true },
            { text: "Liver", correct: false },
            { text: "Lungs", correct: false }
        ]
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Hydrogen", correct: false }
        ]
    },
    {
        question: "Who invented the light bulb?",
        answers: [
            { text: "Thomas Edison", correct: true },
            { text: "Nikola Tesla", correct: false },
            { text: "Alexander Graham Bell", correct: false },
            { text: "Albert Einstein", correct: false }
        ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_button");
const next_btn = document.getElementById("next_button");

//tracking pointers
let currentQuestionIndex = 0;
let score = 0;
let submitted = false;

//start quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    next_btn.innerText = "Submit";
    showQuestion();
}

function showQuestion() {
    resetState();
    submitted = false;
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const label = document.createElement("label");
        label.style.display = "block";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = answer.correct;
        radio.id = `option${index}`;

        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + answer.text));


        // btn.innerText = answer.text;
        // btn.classList.add("btn");
        // btn.addEventListener("click", () => selectAnswer(answer.correct));
        answerButtons.appendChild(label);
});

    next_btn.innerText = "Submit";
    next_btn.style.display = "block";
}

function resetState() {
    next_btn.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(isCorrect) {
    if(isCorrect) score++;

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if(button.innerText === questions[currentQuestionIndex].answers.find(a => a.correct).text) {
            button.style.backgroundColor = "green";
        }
        else {
            button.style.backgroundColor = "lightcoral";
        }
    });
    next_btn.style.display = "block";
}

next_btn.addEventListener("click", () => {

    if(next_btn.innerText === "Restart") {
        startQuiz();
        return;
    }

    if(!submitted) {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if(!selectedOption) {
            alert("Please select an option!");
            return;
        }

        const isCorrect = selectedOption.value === "true";
        if(isCorrect) {
            score++;
            showFeedback("Correct!", "green");
        }
        else {
            showFeedback("incorrect!", "red");
        }

        disableOptions();
        next_btn.innerText = "Next";
        submitted = true;
    }
    else {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length) {
            showQuestion();
        }
        else {
            showScore();
        }
    }
});

// next_btn.addEventListener("click", () => {
//     currentQuestionIndex++;
//     if(currentQuestionIndex < questions.length) {
//         showQuestion();
//     }
//     else {
//         showScore();
//     }
// });

function showFeedback(message, color) {
    const feedback = document.createElement("p");
    feedback.innerText = message;
    feedback.style.color = color;
    feedback.style.fontWeight = "bold";
    feedback.style.marginTop = "10px";
    answerButtons.appendChild(feedback);
}

function disableOptions () {
    const options = document.querySelectorAll('input[name="answer"]');
    options.forEach(opt => opt.disabled = true);
}

function showScore() {
    resetState();
    questionElement.innerText = `You Scored ${score} out of ${questions.length}🎊`;
    next_btn.innerText = "Restart";
    next_btn.style.display = "block";
    next_btn.onclick = null;
}

// Joke Popup Handler
const jokeBtn = document.getElementById("jokePopupBtn");

jokeBtn.addEventListener("click", () => {
    // Create popup overlay
    const popupOverlay = document.createElement("div");
    popupOverlay.style.position = "fixed";
    popupOverlay.style.top = 0;
    popupOverlay.style.left = 0;
    popupOverlay.style.width = "100vw";
    popupOverlay.style.height = "100vh";
    popupOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    popupOverlay.style.display = "flex";
    popupOverlay.style.justifyContent = "center";
    popupOverlay.style.alignItems = "center";
    popupOverlay.style.zIndex = 1000;

    // Create popup box
    const popupBox = document.createElement("div");
    popupBox.style.backgroundColor = "white";
    popupBox.style.padding = "20px 30px";
    popupBox.style.borderRadius = "10px";
    popupBox.style.maxWidth = "400px";
    popupBox.style.textAlign = "center";
    popupBox.style.boxShadow = "0 0 15px rgba(255,255,255,0.3)";
    popupBox.innerText = "Loading a joke...";

    // Fetch the joke
    fetch("https://official-joke-api.appspot.com/jokes/random")
        .then(res => res.json())
        .then(data => {
            popupBox.innerText = `${data.setup}\n\n${data.punchline}`;
        })
        .catch(() => {
            popupBox.innerText = "Couldn't fetch a joke. Try again later!";
        });

    // Close on click anywhere
    popupOverlay.addEventListener("click", () => {
        document.body.removeChild(popupOverlay);
    });

    popupOverlay.appendChild(popupBox);
    document.body.appendChild(popupOverlay);
});


// window.onload = startQuiz;
startQuiz();