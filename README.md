# Kanji Learning Website

A simple, interactive website for learning Japanese Kanji characters with mini-games.

## Features

### 1. **Welcome Page (index.html)**
- Username input for personalized experience
- Clean, modern interface with Bootstrap styling

### 2. **Study Page (study.html)**
- Browse through 15 basic Kanji characters
- View reading (pronunciation), meaning, and example usage
- Quick test to reinforce learning
- Navigation between characters

### 3. **Three Mini-Games**

#### 🎯 Word Builder (game1.html)
- Build compound words by selecting kanji in the correct order
- Target meaning is shown
- Select kanji characters to form the word
- Score tracking

#### 🔗 Kanji Match (game2.html)
- Match kanji characters with their meanings
- 60-second time limit
- Click kanji and meaning to create pairs
- Score: 10 points per match

#### ⚡ Speed Quiz (game3.html)
- Answer as many questions as possible in 60 seconds
- Multiple choice questions
- High score tracking with localStorage
- Top 5 leaderboard

## Technology Stack

- **HTML5**: Structure and content
- **Bootstrap 5.3.2**: Responsive design and UI components (via CDN)
- **JavaScript**: Interactive functionality and game logic
- **CSS3**: Custom styling and animations
- **LocalStorage**: Username and high score persistence

## File Structure

```
Project_PBJepang/
├── index.html          # Welcome/login page
├── study.html          # Main study page with kanji learning
├── game1.html          # Word Builder game
├── game2.html          # Kanji Match game
├── game3.html          # Speed Quiz game
├── css/
│   └── style.css       # Custom styles
└── js/
    ├── main.js         # Utility functions
    ├── kanjiData.js    # Kanji data and helper functions
    ├── study.js        # Study page logic
    ├── game1.js        # Word Builder game logic
    ├── game2.js        # Kanji Match game logic
    └── game3.js        # Speed Quiz game logic
```

## How to Use

1. Open `index.html` in a web browser
2. Enter your name to begin
3. Study kanji characters on the study page
4. Take the quick tests to reinforce learning
5. Play the three mini-games to practice
6. Try to beat your high score!

## Kanji Included

The website includes 15 basic kanji characters:
- 日 (sun, day)
- 月 (moon, month)
- 火 (fire)
- 水 (water)
- 木 (tree, wood)
- 金 (gold, money)
- 土 (earth, soil)
- 人 (person)
- 山 (mountain)
- 川 (river)
- 田 (rice field)
- 本 (book, origin)
- 学 (study)
- 校 (school)
- 生 (life, birth)

## Features

- ✅ No installation required - runs directly in browser
- ✅ No server needed - pure client-side application
- ✅ Responsive design - works on mobile and desktop
- ✅ Uses CDN for Bootstrap - no npm or build process
- ✅ Persistent username and high scores
- ✅ Interactive and engaging learning experience

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Future Enhancements

Potential additions:
- More kanji characters
- Additional game modes
- Audio pronunciation
- Writing practice (stroke order)
- Progress tracking
- Difficulty levels

## License

Free to use for educational purposes.
