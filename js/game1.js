// Game 1: Belajar Angka Kanji (Kanji Numbers Learning)
let currentIntroIndex = 0;
let score = 0;
let totalQuestions = 0;
let currentQuizQuestion = null;
let askedQuestions = [];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize introduction
    showIntroduction();
    loadIntroKanji(currentIntroIndex);
    
    // Introduction navigation
    document.getElementById('prevIntroBtn').addEventListener('click', () => {
        if (currentIntroIndex > 0) {
            currentIntroIndex--;
            loadIntroKanji(currentIntroIndex);
        }
    });
    
    document.getElementById('nextIntroBtn').addEventListener('click', () => {
        if (currentIntroIndex < kanjiNumbers.length - 1) {
            currentIntroIndex++;
            loadIntroKanji(currentIntroIndex);
        }
    });
    
    // Start quiz button
    document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
    
    // Back to introduction button
    document.getElementById('backToIntroBtn').addEventListener('click', () => {
        showIntroduction();
        currentIntroIndex = 0;
        loadIntroKanji(currentIntroIndex);
    });
    
    // Result screen buttons
    document.getElementById('retryQuizBtn').addEventListener('click', () => {
        score = 0;
        totalQuestions = 0;
        askedQuestions = [];
        startQuiz();
    });
    
    document.getElementById('reviewIntroBtn').addEventListener('click', () => {
        showIntroduction();
        currentIntroIndex = 0;
        loadIntroKanji(currentIntroIndex);
    });
});

function showIntroduction() {
    document.getElementById('introScreen').style.display = 'block';
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'none';
}

function showQuiz() {
    document.getElementById('introScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';
    document.getElementById('resultScreen').style.display = 'none';
}

function showResults() {
    document.getElementById('introScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'block';
}

function loadIntroKanji(index) {
    const kanji = kanjiNumbers[index];
    document.getElementById('introKanji').textContent = kanji.kanji;
    document.getElementById('introNumber').textContent = `Angka ${kanji.number} (${kanji.meaning})`;
    document.getElementById('introReading').textContent = `Dibaca: ${kanji.reading}`;
    document.getElementById('introExample').textContent = kanji.example;
    document.getElementById('introCounter').textContent = `${index + 1} / ${kanjiNumbers.length}`;
    
    // Update button states
    document.getElementById('prevIntroBtn').disabled = index === 0;
    document.getElementById('nextIntroBtn').disabled = index === kanjiNumbers.length - 1;
}

function startQuiz() {
    score = 0;
    totalQuestions = 10;
    askedQuestions = [];
    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = totalQuestions;
    showQuiz();
    loadQuizQuestion();
}

function loadQuizQuestion() {
    // Clear previous result
    document.getElementById('quizResult').innerHTML = '';
    
    // Check if all questions have been asked
    if (askedQuestions.length >= kanjiNumbers.length) {
        showResults();
        displayFinalScore();
        return;
    }
    
    // Select a random kanji that hasn't been asked yet
    let availableQuestions = kanjiNumbers.filter((_, index) => !askedQuestions.includes(index));
    let randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuizQuestion = availableQuestions[randomIndex];
    
    // Mark this question as asked
    askedQuestions.push(kanjiNumbers.indexOf(currentQuizQuestion));
    
    // Display the kanji
    document.getElementById('quizKanji').textContent = currentQuizQuestion.kanji;
    
    // Generate answer options (correct + 3 random wrong answers)
    let options = [currentQuizQuestion.number];
    let wrongAnswers = kanjiNumbers
        .filter(k => k.number !== currentQuizQuestion.number)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(k => k.number);
    
    options.push(...wrongAnswers);
    options = shuffleArray(options);
    
    // Display options
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary btn-lg';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, button));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedNumber, button) {
    // totalQuestions++;
    // document.getElementById('total').textContent = totalQuestions;
    
    // Disable all buttons
    const allButtons = document.querySelectorAll('#quizOptions button');
    allButtons.forEach(btn => btn.disabled = true);
    
    const resultDiv = document.getElementById('quizResult');
    
    if (selectedNumber === currentQuizQuestion.number) {
        // Correct answer
        score++;
        document.getElementById('score').textContent = score;
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-success');
        
        resultDiv.innerHTML = `
            <div class="alert alert-success">
                <h5>✓ Benar!</h5>
                <p class="mb-0">${currentQuizQuestion.kanji} = ${currentQuizQuestion.number} (${currentQuizQuestion.reading})</p>
            </div>
        `;
    } else {
        // Wrong answer
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-danger');
        
        // Highlight correct answer
        allButtons.forEach(btn => {
            if (parseInt(btn.textContent) === currentQuizQuestion.number) {
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-success');
            }
        });
        
        resultDiv.innerHTML = `
            <div class="alert alert-danger">
                <h5>✗ Salah</h5>
                <p class="mb-0">Jawaban yang benar: ${currentQuizQuestion.kanji} = ${currentQuizQuestion.number} (${currentQuizQuestion.reading})</p>
            </div>
        `;
    }
    
    // Load next question after delay
    setTimeout(() => {
        loadQuizQuestion();
    }, 2000);
}

function displayFinalScore() {
    const percentage = Math.round((score / totalQuestions) * 100);
    document.getElementById('finalScore').textContent = `${score} / ${totalQuestions} (${percentage}%)`;
    
    let message = '';
    if (percentage === 100) {
        message = '🌟 Sempurna! Anda menguasai semua angka Kanji!';
    } else if (percentage >= 80) {
        message = '👏 Bagus sekali! Anda hampir sempurna!';
    } else if (percentage >= 60) {
        message = '👍 Lumayan! Terus berlatih ya!';
    } else {
        message = '💪 Jangan menyerah! Coba review lagi angka-angkanya!';
    }
    
    document.getElementById('finalMessage').textContent = message;
}
