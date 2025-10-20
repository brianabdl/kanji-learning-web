// Game 2: Kanji Match
let selectedKanji = null;
let selectedMeaning = null;
let matchedPairs = 0;
let score = 0;
let totalPairs = 0;
let timeLeft = 60;
let timerInterval = null;
let gameActive = true;

document.addEventListener('DOMContentLoaded', function() {
    initGame();
    startTimer();
    
    document.getElementById('playAgainBtn').addEventListener('click', () => {
        location.reload();
    });
});

function initGame() {
    // Select 6 random kanji for matching
    const selectedKanjiData = getRandomElements(kanjiData, 6);
    totalPairs = selectedKanjiData.length;
    
    // Create kanji buttons
    const kanjiColumn = document.getElementById('kanjiColumn');
    const kanjiButtons = selectedKanjiData.map((item, index) => {
        return { kanji: item.kanji, id: `kanji-${index}`, meaning: item.meaning };
    });
    
    kanjiButtons.forEach(item => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary match-btn';
        button.textContent = item.kanji;
        button.dataset.id = item.id;
        button.dataset.meaning = item.meaning;
        button.addEventListener('click', () => selectKanjiButton(button));
        kanjiColumn.appendChild(button);
    });
    
    // Create meaning buttons (shuffled)
    const meaningColumn = document.getElementById('meaningColumn');
    const meaningButtons = shuffleArray(selectedKanjiData.map((item, index) => {
        return { meaning: item.meaning, id: `meaning-${index}`, kanji: item.kanji };
    }));
    
    meaningButtons.forEach(item => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-secondary match-btn';
        button.textContent = item.meaning;
        button.dataset.id = item.id;
        button.dataset.kanji = item.kanji;
        button.addEventListener('click', () => selectMeaningButton(button));
        meaningColumn.appendChild(button);
    });
}

function selectKanjiButton(button) {
    if (!gameActive || button.classList.contains('matched')) return;
    
    // Deselect previous kanji if any
    if (selectedKanji) {
        selectedKanji.classList.remove('selected');
    }
    
    selectedKanji = button;
    button.classList.add('selected');
    
    checkMatch();
}

function selectMeaningButton(button) {
    if (!gameActive || button.classList.contains('matched')) return;
    
    // Deselect previous meaning if any
    if (selectedMeaning) {
        selectedMeaning.classList.remove('selected');
    }
    
    selectedMeaning = button;
    button.classList.add('selected');
    
    checkMatch();
}

function checkMatch() {
    if (!selectedKanji || !selectedMeaning) return;
    
    const kanjiMeaning = selectedKanji.dataset.meaning;
    const meaningKanji = selectedMeaning.dataset.kanji;
    
    if (kanjiMeaning === selectedMeaning.textContent && 
        meaningKanji === selectedKanji.textContent) {
        // Match!
        selectedKanji.classList.remove('selected');
        selectedKanji.classList.add('matched');
        selectedMeaning.classList.remove('selected');
        selectedMeaning.classList.add('matched');
        
        matchedPairs++;
        score += 10;
        
        document.getElementById('score').textContent = score;
        
        // Check if game is complete
        if (matchedPairs === totalPairs) {
            endGame(true);
        }
        
        selectedKanji = null;
        selectedMeaning = null;
    } else {
        // No match - deselect after a short delay
        setTimeout(() => {
            if (selectedKanji) selectedKanji.classList.remove('selected');
            if (selectedMeaning) selectedMeaning.classList.remove('selected');
            selectedKanji = null;
            selectedMeaning = null;
        }, 500);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 10) {
            document.getElementById('timer').classList.remove('bg-danger');
            document.getElementById('timer').classList.add('bg-warning');
        }
        
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

function endGame(completed) {
    gameActive = false;
    clearInterval(timerInterval);
    
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('resultArea').style.display = 'block';
    
    let message = '';
    if (completed) {
        message = `🎉 Congratulations! You matched all pairs!<br>Final Score: ${score}<br>Time Remaining: ${timeLeft}s`;
    } else {
        message = `⏰ Time's up!<br>You matched ${matchedPairs} out of ${totalPairs} pairs.<br>Final Score: ${score}`;
    }
    
    document.getElementById('finalScore').innerHTML = message;
}
