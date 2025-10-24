// Game 4 - Hiragana Word Formation Game
let gameGrid = [];
let selectedCells = [];
let foundWords = [];
let currentScore = 0;
let targetWords = [];
let gridSize = 8;
let currentWordData = null;
let isSelectingPath = false;

// DOM Elements
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const resultScreen = document.getElementById('resultScreen');
const hiraganaGrid = document.getElementById('hiraganaGrid');
const selectedWordInput = document.getElementById('selectedWordInput');
const submitWordBtn = document.getElementById('submitWordBtn');
const clearSelectionBtn = document.getElementById('clearSelectionBtn');
const feedbackAlert = document.getElementById('feedbackAlert');
const foundWordsList = document.getElementById('foundWordsList');
const kanjiMatchSection = document.getElementById('kanjiMatchSection');
const kanjiOptions = document.getElementById('kanjiOptions');
const currentHiragana = document.getElementById('currentHiragana');
const scoreDisplay = document.getElementById('scoreDisplay');
const foundWordsCount = document.getElementById('foundWordsCount');
const totalWordsCount = document.getElementById('totalWordsCount');

// Event Listeners
document.getElementById('startGameBtn').addEventListener('click', initGame);
document.getElementById('resetGameBtn').addEventListener('click', initGame);
document.getElementById('playAgainBtn').addEventListener('click', initGame);
submitWordBtn.addEventListener('click', submitWord);
clearSelectionBtn.addEventListener('click', clearSelection);

function initGame() {
    // Reset game state
    selectedCells = [];
    foundWords = [];
    currentScore = 0;
    currentWordData = null;
    
    // Select random words for this game (5-8 words)
    const wordCount = Math.floor(Math.random() * 4) + 5;
    targetWords = getRandomElements(hiraganaWordBank, wordCount);
    
    // Update UI
    scoreDisplay.textContent = '0';
    foundWordsCount.textContent = '0';
    totalWordsCount.textContent = targetWords.length;
    foundWordsList.innerHTML = '<p class="text-muted text-center">Belum ada kata yang ditemukan</p>';
    kanjiMatchSection.style.display = 'none';
    
    // Generate grid
    generateGrid();
    
    // Show game screen
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    resultScreen.style.display = 'none';
    
    clearSelection();
    hideFeedback();
}

function generateGrid() {
    gameGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    
    // Place target words in the grid
    targetWords.forEach(wordData => {
        let placed = false;
        let attempts = 0;
        
        while (!placed && attempts < 100) {
            const horizontal = Math.random() > 0.5;
            const word = wordData.hiragana;
            const wordLength = word.length;
            
            if (horizontal) {
                const row = Math.floor(Math.random() * gridSize);
                const col = Math.floor(Math.random() * (gridSize - wordLength + 1));
                
                // Check if space is available
                let canPlace = true;
                for (let i = 0; i < wordLength; i++) {
                    if (gameGrid[row][col + i] !== '') {
                        canPlace = false;
                        break;
                    }
                }
                
                if (canPlace) {
                    for (let i = 0; i < wordLength; i++) {
                        gameGrid[row][col + i] = word[i];
                    }
                    placed = true;
                }
            } else {
                const row = Math.floor(Math.random() * (gridSize - wordLength + 1));
                const col = Math.floor(Math.random() * gridSize);
                
                // Check if space is available
                let canPlace = true;
                for (let i = 0; i < wordLength; i++) {
                    if (gameGrid[row + i][col] !== '') {
                        canPlace = false;
                        break;
                    }
                }
                
                if (canPlace) {
                    for (let i = 0; i < wordLength; i++) {
                        gameGrid[row + i][col] = word[i];
                    }
                    placed = true;
                }
            }
            
            attempts++;
        }
    });
    
    // Fill empty cells with random hiragana
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (gameGrid[i][j] === '') {
                gameGrid[i][j] = allHiragana[Math.floor(Math.random() * allHiragana.length)];
            }
        }
    }
    
    // Render grid
    renderGrid();
}

function renderGrid() {
    hiraganaGrid.innerHTML = '';
    
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'hiragana-cell';
            cell.textContent = gameGrid[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;
            
            // Use a closure to capture the current i, j values
            (function(row, col) {
                // Mouse events
                cell.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    startSelection(row, col);
                });
                
                cell.addEventListener('mouseenter', () => {
                    if (isSelectingPath) {
                        addToSelection(row, col);
                    }
                });
                
                cell.addEventListener('mouseup', () => {
                    endSelection();
                });
                
                // Touch events for mobile
                cell.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    startSelection(row, col);
                }, { passive: false });
                
                cell.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const touch = e.touches[0];
                    const element = document.elementFromPoint(touch.clientX, touch.clientY);
                    if (element && element.classList.contains('hiragana-cell')) {
                        const touchRow = parseInt(element.dataset.row);
                        const touchCol = parseInt(element.dataset.col);
                        addToSelection(touchRow, touchCol);
                    }
                }, { passive: false });
                
                cell.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    endSelection();
                }, { passive: false });
            })(i, j);

            hiraganaGrid.appendChild(cell);
        }
    }
}

function startSelection(row, col) {
    // If starting a new selection (not currently selecting)
    // then clear the previous selection
    if (!isSelectingPath) {
        selectedCells = [];
        updateSelectedWord();
        highlightSelection();
    }
    isSelectingPath = true;
    addToSelection(row, col);
}

function addToSelection(row, col) {
    if (!isSelectingPath) return;
    
    // Check if this cell is already selected
    const alreadySelected = selectedCells.some(cell => cell.row === row && cell.col === col);
    if (alreadySelected) return;
    
    // Check if adjacent to last selected cell (or is first cell)
    if (selectedCells.length > 0) {
        const lastCell = selectedCells[selectedCells.length - 1];
        const rowDiff = Math.abs(row - lastCell.row);
        const colDiff = Math.abs(col - lastCell.col);
        
        // Must be adjacent (horizontal or vertical only, not diagonal)
        if (!((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1))) {
            return;
        }
    }
    
    selectedCells.push({ row, col, char: gameGrid[row][col] });
    updateSelectedWord();
    highlightSelection();
}

function endSelection() {
    isSelectingPath = false;
}

function clearSelection() {
    selectedCells = [];
    isSelectingPath = false;
    updateSelectedWord();
    highlightSelection();
    hideFeedback();
    submitWordBtn.disabled = true;
}

function updateSelectedWord() {
    const word = selectedCells.map(cell => cell.char).join('');
    selectedWordInput.value = word;
    submitWordBtn.disabled = word.length === 0;
}

function highlightSelection() {
    // Remove all highlights
    document.querySelectorAll('.hiragana-cell').forEach(cell => {
        cell.classList.remove('selected', 'found');
    });
    
    // Highlight selected cells
    selectedCells.forEach(cell => {
        const cellElement = document.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
        if (cellElement) {
            cellElement.classList.add('selected');
        }
    });
    
    // Highlight found words
    foundWords.forEach(wordInfo => {
        wordInfo.cells.forEach(cell => {
            const cellElement = document.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
            if (cellElement) {
                cellElement.classList.add('found');
            }
        });
    });
}

function submitWord() {
    const selectedWord = selectedWordInput.value;
    
    // Check if word is in target words
    const wordData = targetWords.find(w => w.hiragana === selectedWord);
    
    if (!wordData) {
        showFeedback('Kata tidak ditemukan dalam daftar. Coba lagi!', 'danger');
        return;
    }
    
    // Check if already found
    if (foundWords.some(w => w.word === selectedWord)) {
        showFeedback('Kata ini sudah ditemukan sebelumnya!', 'warning');
        return;
    }
    
    // Word is valid and new!
    currentWordData = wordData;
    showFeedback(`Bagus! Kata "${selectedWord}" ditemukan! Sekarang pilih kanji yang benar.`, 'success');
    
    // Store cells for highlighting
    foundWords.push({
        word: selectedWord,
        cells: [...selectedCells],
        data: wordData,
        kanjiMatched: false
    });
    
    // Show kanji matching section
    showKanjiMatching(wordData);
    
    // Disable submission temporarily
    submitWordBtn.disabled = true;
    highlightSelection();
}

function showKanjiMatching(wordData) {
    currentHiragana.textContent = wordData.hiragana;
    kanjiOptions.innerHTML = '';
    
    wordData.kanjiOptions.forEach(kanji => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary btn-lg';
        btn.textContent = kanji;
        btn.onclick = () => checkKanjiMatch(kanji);
        kanjiOptions.appendChild(btn);
    });
    
    kanjiMatchSection.style.display = 'block';
}

function checkKanjiMatch(selectedKanji) {
    if (selectedKanji === currentWordData.correctKanji) {
        // Correct match!
        const points = currentWordData.hiragana.length * 10;
        currentScore += points;
        scoreDisplay.textContent = currentScore;
        
        // Mark as matched
        const foundWord = foundWords.find(w => w.word === currentWordData.hiragana);
        if (foundWord) {
            foundWord.kanjiMatched = true;
        }
        
        // Update found words list
        updateFoundWordsList();
        
        showFeedback(`Benar! ${currentWordData.hiragana} = ${selectedKanji}. +${points} poin!`, 'success');
        kanjiMatchSection.style.display = 'none';
        
        clearSelection();
        
        // Check if game is complete
        if (foundWords.filter(w => w.kanjiMatched).length === targetWords.length) {
            setTimeout(showResults, 1500);
        }
    } else {
        showFeedback(`Salah! Coba lagi. Kanji yang benar adalah ${currentWordData.correctKanji}`, 'danger');
        currentScore = Math.max(0, currentScore - 5);
        scoreDisplay.textContent = currentScore;
    }
}

function updateFoundWordsList() {
    if (foundWords.filter(w => w.kanjiMatched).length === 0) {
        foundWordsList.innerHTML = '<p class="text-muted text-center">Belum ada kata yang ditemukan</p>';
        return;
    }
    
    foundWordsList.innerHTML = '';
    foundWords.filter(w => w.kanjiMatched).forEach(wordInfo => {
        const item = document.createElement('div');
        item.className = 'found-word-item mb-2 p-2 bg-light rounded';
        item.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <strong class="text-primary">${wordInfo.data.hiragana}</strong> = 
                    <strong>${wordInfo.data.correctKanji}</strong>
                </div>
                <span class="badge bg-success">✓</span>
            </div>
            <small class="text-muted">${wordInfo.data.romaji} - ${wordInfo.data.meaning}</small>
        `;
        foundWordsList.appendChild(item);
    });
    
    foundWordsCount.textContent = foundWords.filter(w => w.kanjiMatched).length;
}

function showFeedback(message, type) {
    feedbackAlert.className = `alert alert-${type}`;
    feedbackAlert.textContent = message;
    feedbackAlert.style.display = 'block';
    
    setTimeout(() => {
        hideFeedback();
    }, 3000);
}

function hideFeedback() {
    feedbackAlert.style.display = 'none';
}

function showResults() {
    document.getElementById('finalScore').textContent = currentScore;
    document.getElementById('finalWordsFound').textContent = foundWords.filter(w => w.kanjiMatched).length;
    
    let message = '';
    if (currentScore >= 200) {
        message = 'Luar biasa! Anda sangat mahir! 🌟';
    } else if (currentScore >= 150) {
        message = 'Hebat! Pertahankan! 🎯';
    } else if (currentScore >= 100) {
        message = 'Bagus! Terus berlatih! 💪';
    } else {
        message = 'Kerja bagus! Coba lagi untuk skor lebih tinggi! 📚';
    }
    document.getElementById('resultMessage').textContent = message;
    
    gameScreen.style.display = 'none';
    resultScreen.style.display = 'block';
}

// Prevent text selection during drag
document.addEventListener('selectstart', (e) => {
    if (isSelectingPath) {
        e.preventDefault();
    }
});

// Add global mouseup handler to ensure selection ends
document.addEventListener('mouseup', () => {
    if (isSelectingPath) {
        endSelection();
    }
});

// Add global touchend handler to ensure selection ends
document.addEventListener('touchend', () => {
    if (isSelectingPath) {
        endSelection();
    }
});

// Prevent default touch behavior on the grid
if (hiraganaGrid) {
    hiraganaGrid.addEventListener('touchstart', (e) => {
        e.preventDefault();
    }, { passive: false });
}
