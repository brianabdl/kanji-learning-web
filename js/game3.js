// Game 3: Speed Quiz
let score = 0;
let questionCount = 0;
let timeLeft = 60;
let timerInterval = null;
let currentQuestion = null;
let gameActive = false;

document.addEventListener('DOMContentLoaded', function() {
    loadHighScores();
    
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('playAgainBtn').addEventListener('click', () => {
        location.reload();
    });
});

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';
    
    score = 0;
    questionCount = 0;
    timeLeft = 60;
    gameActive = true;
    
    startTimer();
    loadQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').textContent = timeLeft;
        
        if (timeLeft <= 10) {
            document.getElementById('timeLeft').classList.remove('bg-danger');
            document.getElementById('timeLeft').classList.add('bg-warning');
        }
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function loadQuestion() {
    if (!gameActive) return;
    
    questionCount++;
    document.getElementById('questionNum').textContent = questionCount;
    
    // Pick a random kanji
    currentQuestion = kanjiData[Math.floor(Math.random() * kanjiData.length)];
    document.getElementById('quizKanji').textContent = currentQuestion.kanji;
    
    // Generate options (1 correct + 3 wrong)
    const options = [currentQuestion.meaning];
    const wrongAnswers = kanjiData
        .filter(k => k.meaning !== currentQuestion.meaning)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(k => k.meaning);
    
    options.push(...wrongAnswers);
    const shuffledOptions = shuffleArray(options);
    
    // Display options
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary quiz-option';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, button));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer, button) {
    if (!gameActive) return;
    
    const allButtons = document.querySelectorAll('#quizOptions button');
    allButtons.forEach(btn => btn.disabled = true);
    
    if (selectedAnswer === currentQuestion.meaning) {
        button.classList.remove('btn-outline-primary');
        button.classList.add('correct');
        score++;
        document.getElementById('score').textContent = score;
        
        // Load next question quickly
        setTimeout(() => {
            loadQuestion();
        }, 500);
    } else {
        button.classList.remove('btn-outline-primary');
        button.classList.add('wrong');
        
        // Show correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === currentQuestion.meaning) {
                btn.classList.add('correct');
            }
        });
        
        // Load next question after showing correct answer
        setTimeout(() => {
            loadQuestion();
        }, 1000);
    }
}

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'block';
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('totalQuestions').textContent = questionCount;
    
    // Save high score
    saveHighScore(score);
    loadHighScores();
}

function saveHighScore(newScore) {
    const username = getUsername();
    let highScores = JSON.parse(localStorage.getItem('kanjiHighScores') || '[]');
    
    highScores.push({
        name: username,
        score: newScore,
        date: new Date().toLocaleDateString()
    });
    
    // Sort by score (descending) and keep top 5
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5);
    
    localStorage.setItem('kanjiHighScores', JSON.stringify(highScores));
}

function loadHighScores() {
    const highScores = JSON.parse(localStorage.getItem('kanjiHighScores') || '[]');
    const highScoresList = document.getElementById('highScores');
    
    if (highScores.length === 0) {
        highScoresList.innerHTML = '<li class="text-muted">Belum ada skor!</li>';
    } else {
        highScoresList.innerHTML = highScores.map(score => 
            `<li>${score.name}: <strong>${score.score}</strong> poin (${score.date})</li>`
        ).join('');
    }
}
