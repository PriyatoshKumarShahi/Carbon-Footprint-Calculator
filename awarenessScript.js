const quizData = [ 
    {
        question: "Which of the following is the largest source of carbon emissions?",
        options: ["Transportation", "Electricity Production", "Agriculture", "Waste Management"],
        answer: "Electricity Production",
        fact: "Electricity production is the largest contributor to global CO₂ emissions, mostly from burning fossil fuels like coal and natural gas."
    },
    {
        question: "What is the average carbon footprint per person per year in the world?",
        options: ["4 tonnes", "7 tonnes", "12 tonnes", "20 tonnes"],
        answer: "4 tonnes",
        fact: "The average carbon footprint per person globally is about 4 tonnes of CO₂ per year."
    },
    {
        question: "What percentage of global emissions are caused by transportation?",
        options: ["8%", "14%", "23%", "35%"],
        answer: "23%",
        fact: "Transportation accounts for approximately 23% of global carbon emissions, largely from road vehicles."
    },
    {
        question: "How much CO₂ can one tree absorb in a year?",
        options: ["5 kg", "22 kg", "48 kg", "100 kg"],
        answer: "22 kg",
        fact: "On average, one mature tree can absorb about 22 kg of CO₂ each year."
    }
];

let currentQuiz = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const submitBtn = document.getElementById('submit-btn');
const retryBtn = document.getElementById('retry-btn');
const resultsContainer = document.getElementById('results');
const scoreContainer = document.getElementById('score');
const factContainer = document.getElementById('fact');
const allCorrectAnswersContainer = document.getElementById('all-correct-answers'); // New container

function loadQuiz() {
    quizContainer.innerHTML = '';

    const quizItem = quizData[currentQuiz];

    // Create question element
    const questionEl = document.createElement('div');
    questionEl.classList.add('question');
    questionEl.innerText = quizItem.question;
    quizContainer.appendChild(questionEl);

    // Create options
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options');

    quizItem.options.forEach(option => {
        const optionEl = document.createElement('label');
        optionEl.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
        optionsContainer.appendChild(optionEl);
    });

    quizContainer.appendChild(optionsContainer);

    // Change the button text dynamically
    if (currentQuiz === quizData.length - 1) {
        submitBtn.innerText = 'Submit';
    } else {
        submitBtn.innerText = 'Next';
    }
}

// Function to check the selected answer
function getSelectedAnswer() {
    const options = document.querySelectorAll('input[name="option"]');
    let selectedOption;
    options.forEach(option => {
        if (option.checked) {
            selectedOption = option.value;
        }
    });
    return selectedOption;
}

// Display the result and fact
function showResults() {
    const quizItem = quizData[currentQuiz];
    const selectedAnswer = getSelectedAnswer();

    if (selectedAnswer === quizItem.answer) {
        score++;
    }

    // Display the score and fact
    scoreContainer.innerText = `Your score: ${score}/${quizData.length}`;
    factContainer.innerText = `Fact: ${quizItem.fact}`;

    // Display the correct answer for the current question
    document.getElementById('correct-answer').innerText = `Correct Answer: ${quizItem.answer}`;
}

// Function to handle next or submit button clicks
submitBtn.addEventListener('click', () => {
    const selectedAnswer = getSelectedAnswer();

    if (selectedAnswer) {
        showResults();
        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz(); // Load next question
        } else {
            // End of quiz, show results and hide submit button
            quizContainer.style.display = 'none';
            submitBtn.style.display = 'none';
            resultsContainer.style.display = 'block';
            retryBtn.style.display = 'block';

            // Display all correct answers
            displayAllCorrectAnswers();
        }
    } else {
        alert("Please select an option before proceeding.");
    }
});

// Function to display all correct answers
function displayAllCorrectAnswers() {
    allCorrectAnswersContainer.innerHTML = ''; // Clear previous answers

    quizData.forEach((quizItem, index) => {
        const answerEl = document.createElement('p');
        answerEl.innerText = `Question ${index + 1}: ${quizItem.answer}`;
        allCorrectAnswersContainer.appendChild(answerEl);
    });
}

// Retry the quiz
retryBtn.addEventListener('click', () => {
    currentQuiz = 0;
    score = 0;

    quizContainer.style.display = 'block';
    submitBtn.style.display = 'block';
    resultsContainer.style.display = 'none';
    retryBtn.style.display = 'none';
    allCorrectAnswersContainer.innerHTML = ''; // Clear previous answers

    loadQuiz(); // Start again
});

// Initial load
loadQuiz();
