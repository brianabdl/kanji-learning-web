// Game 2: Image to Kanji Match
let selectedImage = null;
let selectedKanji = null;
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
    
    // Create image buttons
    const imageColumn = document.getElementById('imageColumn');
    const imageButtons = selectedKanjiData.map((item, index) => {
        return { imagePath: item.imagePath, kanji: item.kanji, id: `image-${index}`, meaning: item.meaning };
    });
    
    imageButtons.forEach(item => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary match-btn image-card';
        
        // Create image element
        const img = document.createElement('img');
        img.src = item.imagePath;
        img.alt = item.meaning;
        img.className = 'match-image';
        img.onerror = function() {
            // Fallback if image not found - show meaning text instead
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.textContent = item.meaning;
            this.parentElement.appendChild(fallback);
        };
        
        button.appendChild(img);
        button.dataset.id = item.id;
        button.dataset.kanji = item.kanji;
        button.addEventListener('click', () => selectImageButton(button));
        imageColumn.appendChild(button);
    });
    
    // Create kanji buttons (shuffled)
    const kanjiColumn = document.getElementById('kanjiColumn');
    const kanjiButtons = shuffleArray(selectedKanjiData.map((item, index) => {
        return { kanji: item.kanji, id: `kanji-${index}`, reading: item.reading };
    }));
    
    kanjiButtons.forEach(item => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-secondary match-btn kanji-card';
        
        // Create kanji display
        const kanjiText = document.createElement('div');
        kanjiText.className = 'kanji-large';
        kanjiText.textContent = item.kanji;
        button.appendChild(kanjiText);
        
        // Create reading display
        const readingText = document.createElement('div');
        readingText.className = 'kanji-reading';
        readingText.textContent = item.reading;
        button.appendChild(readingText);
        
        button.dataset.id = item.id;
        button.dataset.kanji = item.kanji;
        button.addEventListener('click', () => selectKanjiButton(button));
        kanjiColumn.appendChild(button);
    });
}

function selectImageButton(button) {
    if (!gameActive || button.classList.contains('matched')) return;
    
    // Deselect previous image if any
    if (selectedImage) {
        selectedImage.classList.remove('selected');
    }
    
    selectedImage = button;
    button.classList.add('selected');
    
    checkMatch();
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

function checkMatch() {
    if (!selectedImage || !selectedKanji) return;
    
    const imageKanji = selectedImage.dataset.kanji;
    const kanjiChar = selectedKanji.dataset.kanji;
    
    if (imageKanji === kanjiChar) {
        // Match!
        selectedImage.classList.remove('selected');
        selectedImage.classList.add('matched');
        selectedKanji.classList.remove('selected');
        selectedKanji.classList.add('matched');
        
        matchedPairs++;
        score += 10;
        
        document.getElementById('score').textContent = score;
        
        // Check if game is complete
        if (matchedPairs === totalPairs) {
            endGame(true);
        }
        
        selectedImage = null;
        selectedKanji = null;
    } else {
        // No match - deselect after a short delay
        setTimeout(() => {
            if (selectedImage) selectedImage.classList.remove('selected');
            if (selectedKanji) selectedKanji.classList.remove('selected');
            selectedImage = null;
            selectedKanji = null;
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
        message = `🎉 Selamat! Anda berhasil mencocokkan semua pasangan!<br>Skor Akhir: ${score}<br>Waktu Tersisa: ${timeLeft}d`;
    } else {
        message = `⏰ Waktu habis!<br>Anda mencocokkan ${matchedPairs} dari ${totalPairs} pasangan.<br>Skor Akhir: ${score}`;
    }
    
    document.getElementById('finalScore').innerHTML = message;
}
