// Study Page JavaScript
let currentKanjiIndex = 0;
let currentTestAnswer = null;

document.addEventListener('DOMContentLoaded', function() {
    displayUsername();
    loadKanji(currentKanjiIndex);
    generateTest();
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentKanjiIndex < kanjiData.length - 1) {
            currentKanjiIndex++;
            loadKanji(currentKanjiIndex);
            generateTest();
        }
    });
    
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentKanjiIndex > 0) {
            currentKanjiIndex--;
            loadKanji(currentKanjiIndex);
            generateTest();
        }
    });
});

function loadKanji(index) {
    const kanji = kanjiData[index];
    document.getElementById('currentKanji').textContent = kanji.kanji;
    document.getElementById('kanjiReading').textContent = kanji.reading;
    document.getElementById('kanjiMeaning').textContent = kanji.meaning;
    document.getElementById('kanjiExample').textContent = kanji.example;
    document.getElementById('kanjiCounter').textContent = `${index + 1} / ${kanjiData.length}`;
    
    // Update button states
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === kanjiData.length - 1;
}

function generateTest() {
    const testResult = document.getElementById('testResult');
    testResult.innerHTML = '';
    
    // Pick a random kanji for the test
    const randomIndex = Math.floor(Math.random() * kanjiData.length);
    const testKanji = kanjiData[randomIndex];
    currentTestAnswer = testKanji.meaning;
    
    document.getElementById('testKanji').textContent = testKanji.kanji;
    
    // Generate options (correct answer + 3 wrong answers)
    const options = [testKanji.meaning];
    const wrongAnswers = kanjiData
        .filter(k => k.meaning !== testKanji.meaning)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(k => k.meaning);
    
    options.push(...wrongAnswers);
    const shuffledOptions = shuffleArray(options);
    
    // Display options
    const optionsContainer = document.getElementById('testOptions');
    optionsContainer.innerHTML = '';
    
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary';
        button.textContent = option;
        button.addEventListener('click', () => checkTestAnswer(option, button));
        optionsContainer.appendChild(button);
    });
}

function checkTestAnswer(selectedAnswer, button) {
    const testResult = document.getElementById('testResult');
    const allButtons = document.querySelectorAll('#testOptions button');
    
    // Disable all buttons
    allButtons.forEach(btn => btn.disabled = true);
    
    if (selectedAnswer === currentTestAnswer) {
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-success');
        testResult.innerHTML = '<div class="alert alert-success">✓ Correct! Great job!</div>';
    } else {
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-danger');
        testResult.innerHTML = `<div class="alert alert-danger">✗ Incorrect. The correct answer is: ${currentTestAnswer}</div>`;
    }
    
    // Generate new test after 2 seconds
    setTimeout(() => {
        generateTest();
    }, 2000);
}
