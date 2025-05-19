// Enhanced Quiz Logic
class QuantumQuiz {
    constructor() {
        // DOM Elements
        this.quizBody = document.getElementById('quiz-body');
        this.questionElement = document.getElementById('question');
        this.optionsElement = document.getElementById('options');
        this.nextBtn = document.getElementById('next-btn');
        this.timerElement = document.getElementById('timer');
        this.timeElement = document.getElementById('time');
        this.scoreElement = document.getElementById('score');
        this.totalQuestionsElement = document.getElementById('total-questions');
        this.currentQElement = document.getElementById('current-q');
        this.progressBar = document.getElementById('progress-bar');
        this.resultContainer = document.getElementById('result-container');
        this.resultScore = document.getElementById('result-score');
        this.resultMessage = document.getElementById('result-message');
        this.correctAnswersElement = document.getElementById('correct-answers');
        this.wrongAnswersElement = document.getElementById('wrong-answers');
        this.timeTakenElement = document.getElementById('time-taken');
        this.restartBtn = document.getElementById('restart-btn');
        this.reviewBtn = document.getElementById('review-btn');
        this.reviewContainer = document.getElementById('review-container');
        this.reviewAnswersElement = document.getElementById('review-answers');
        this.backBtn = document.getElementById('back-btn');

        // Quiz State
        this.questions = this.loadQuestions();
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timer = null;
        this.timeLeft = 30;
        this.totalTime = 0;
        this.selectedOption = null;
        this.quizStarted = false;
        this.userAnswers = [];
        this.startTime = null;

        // Initialize
        this.initEventListeners();
        this.startQuiz();
    }

    loadQuestions() {
        // This could be replaced with an API call
        return [
            {
                question: "What is the capital of France?",
                options: ["Berlin", "Madrid", "Paris", "Rome"],
                correctAnswer: 2,
                explanation: "Paris has been the capital of France since the 5th century."
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correctAnswer: 1,
                explanation: "Mars appears red due to iron oxide (rust) on its surface."
            },
            {
                question: "What is the largest mammal?",
                options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                correctAnswer: 1,
                explanation: "The blue whale can reach lengths of up to 100 feet."
            },
            {
                question: "Which language runs in a web browser?",
                options: ["Java", "C", "Python", "JavaScript"],
                correctAnswer: 3,
                explanation: "JavaScript is the programming language of the Web."
            },
            {
                question: "What year was JavaScript launched?",
                options: ["1995", "1990", "2000", "1985"],
                correctAnswer: 0,
                explanation: "JavaScript was created by Brendan Eich in 1995."
            },
            {
                question: "Which of these is not a JavaScript framework?",
                options: ["React", "Angular", "Laravel", "Vue"],
                correctAnswer: 2,
                explanation: "Laravel is a PHP framework, not JavaScript."
            },
            {
                question: "What does CSS stand for?",
                options: [
                    "Computer Style Sheets",
                    "Creative Style Sheets",
                    "Cascading Style Sheets",
                    "Colorful Style Sheets"
                ],
                correctAnswer: 2,
                explanation: "CSS stands for Cascading Style Sheets."
            }
        ];
    }

    initEventListeners() {
        this.nextBtn.addEventListener('click', () => this.handleNext());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.reviewBtn.addEventListener('click', () => this.showReview());
        this.backBtn.addEventListener('click', () => this.showResults());
    }

    startQuiz() {
        this.resetQuiz();
        this.loadQuestion();
        this.startTimer();
        this.quizStarted = true;
        this.startTime = new Date();
    }

    resetQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timeLeft = 30;
        this.totalTime = 0;
        this.selectedOption = null;
        this.userAnswers = [];
        this.updateScore();
        this.totalQuestionsElement.textContent = this.questions.length;
        this.progressBar.style.width = '0%';
        this.quizBody.style.display = 'block';
        this.resultContainer.style.display = 'none';
        this.reviewContainer.style.display = 'none';
        this.timerElement.classList.remove('danger');
    }

    loadQuestion() {
        this.resetQuestionState();
        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        this.questionElement.textContent = currentQuestion.question;
        this.currentQElement.textContent = this.currentQuestionIndex + 1;
        
        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.innerHTML = `
                <div class="option-icon">${String.fromCharCode(65 + index)}</div>
                <div class="option-label">${option}</div>
            `;
            optionElement.addEventListener('click', () => this.selectOption(optionElement, index));
            this.optionsElement.appendChild(optionElement);
        });
        
        this.updateProgress();
        this.nextBtn.disabled = true;
        this.nextBtn.textContent = this.currentQuestionIndex < this.questions.length - 1 ? 'Next' : 'Finish';
    }

    resetQuestionState() {
        while (this.optionsElement.firstChild) {
            this.optionsElement.removeChild(this.optionsElement.firstChild);
        }
        this.selectedOption = null;
        this.timeLeft = 30;
        this.timeElement.textContent = this.timeLeft;
        this.timerElement.classList.remove('danger');
    }

    selectOption(optionElement, index) {
        if (this.selectedOption !== null) return;

        this.selectedOption = index;
        
        // Highlight selected option
        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        optionElement.classList.add('selected');
        
        this.nextBtn.disabled = false;
        
        // Automatically proceed after selection (optional)
        // setTimeout(() => this.handleNext(), 1000);
    }

    handleNext() {
        if (this.selectedOption === null && this.currentQuestionIndex < this.questions.length - 1) return;

        this.checkAnswer();
        
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion();
            this.startTimer();
        } else {
            this.finishQuiz();
        }
    }

    checkAnswer() {
        clearInterval(this.timer);
        
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        const isCorrect = this.selectedOption === currentQuestion.correctAnswer;
        
        // Record user answer
        this.userAnswers.push({
            question: currentQuestion.question,
            userAnswer: currentQuestion.options[this.selectedOption],
            correctAnswer: currentQuestion.options[currentQuestion.correctAnswer],
            isCorrect,
            explanation: currentQuestion.explanation
        });
        
        // Update score if correct
        if (isCorrect) {
            this.score++;
            this.updateScore();
        }
        
        // Highlight correct and wrong answers
        options.forEach((option, index) => {
            option.classList.add('disabled');
            if (index === currentQuestion.correctAnswer) {
                option.classList.add('correct');
            } else if (index === this.selectedOption && !isCorrect) {
                option.classList.add('wrong');
            }
        });
    }

    startTimer() {
        clearInterval(this.timer);
        this.timeLeft = 30;
        this.updateTimer();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.totalTime++;
            this.updateTimer();
            
            if (this.timeLeft <= 10) {
                this.timerElement.classList.add('danger');
            }
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.handleTimeUp();
            }
        }, 1000);
    }

    updateTimer() {
        this.timeElement.textContent = this.timeLeft;
    }

    handleTimeUp() {
        if (this.selectedOption === null) {
            this.selectedOption = -1; // Mark as unanswered
            this.checkAnswer();
        }
        
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion();
            this.startTimer();
        } else {
            this.finishQuiz();
        }
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex) / this.questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    finishQuiz() {
        clearInterval(this.timer);
        this.quizBody.style.display = 'none';
        this.resultContainer.style.display = 'block';
        
        // Calculate final metrics
        const endTime = new Date();
        const timeTaken = Math.floor((endTime - this.startTime) / 1000);
        const correctAnswers = this.score;
        const wrongAnswers = this.questions.length - this.score;
        const percentage = Math.round((correctAnswers / this.questions.length) * 100);
        
        // Update results
        this.resultScore.textContent = `Your Score: ${correctAnswers}/${this.questions.length} (${percentage}%)`;
        this.correctAnswersElement.textContent = correctAnswers;
        this.wrongAnswersElement.textContent = wrongAnswers;
        this.timeTakenElement.textContent = `${timeTaken}s`;
        
        // Set result message
        if (percentage === 100) {
            this.resultMessage.textContent = "Perfect! You're a quiz master!";
            this.createConfetti();
        } else if (percentage >= 70) {
            this.resultMessage.textContent = "Great job! You know your stuff!";
        } else if (percentage >= 50) {
            this.resultMessage.textContent = "Good effort! Keep learning!";
        } else {
            this.resultMessage.textContent = "Keep practicing! You'll improve!";
        }
    }

    showReview() {
        this.resultContainer.style.display = 'none';
        this.reviewContainer.style.display = 'block';
        
        this.reviewAnswersElement.innerHTML = '';
        
        this.userAnswers.forEach((answer, index) => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            
            const questionElement = document.createElement('div');
            questionElement.className = 'review-question';
            questionElement.innerHTML = `
                <span>${index + 1}.</span>
                <span>${answer.question}</span>
            `;
            
            const userAnswerElement = document.createElement('div');
            userAnswerElement.className = `review-answer ${answer.isCorrect ? 'correct-answer' : 'wrong-answer'}`;
            userAnswerElement.innerHTML = `
                <i class="fas fa-${answer.isCorrect ? 'check' : 'times'}"></i>
                <span>Your answer: ${answer.userAnswer || 'Unanswered'}</span>
            `;
            
            const correctAnswerElement = document.createElement('div');
            correctAnswerElement.className = 'review-answer correct-answer';
            correctAnswerElement.innerHTML = `
                <i class="fas fa-check"></i>
                <span>Correct answer: ${answer.correctAnswer}</span>
            `;
            
            const explanationElement = document.createElement('div');
            explanationElement.className = 'review-answer';
            explanationElement.style.marginTop = '10px';
            explanationElement.style.fontSize = '14px';
            explanationElement.innerHTML = `
                <i class="fas fa-info-circle"></i>
                <span>${answer.explanation}</span>
            `;
            
            reviewItem.appendChild(questionElement);
            if (!answer.isCorrect) {
                reviewItem.appendChild(userAnswerElement);
            }
            reviewItem.appendChild(correctAnswerElement);
            reviewItem.appendChild(explanationElement);
            
            this.reviewAnswersElement.appendChild(reviewItem);
        });
    }

    showResults() {
        this.reviewContainer.style.display = 'none';
        this.resultContainer.style.display = 'block';
    }

    restartQuiz() {
        this.startQuiz();
    }

    createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.backgroundColor = [
                '#8A2BE2', '#FF69B4', '#9370DB', '#2ECC71', '#3498DB'
            ][Math.floor(Math.random() * 5)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
}

// Initialize the quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuantumQuiz();
});
