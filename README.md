# Han Dynasty Jeopardy

An interactive, educational Jeopardy-style game about the Han Dynasty (206 BCE - 220 CE), designed for classroom use. This web application combines engaging gameplay with comprehensive educational content, featuring video explanations and detailed key notes for each clue.

## 🎮 Features

- **Classic Jeopardy Format**: 4 categories × 5 clues each (20 total questions)
- **Educational Focus**: Long-form clues designed for teaching, not just trivia
- **Video Explanations**: Each clue includes an optional video explanation
- **Key Notes**: Detailed teaching points for each answer
- **Team Scoring**: Support for 1-6 teams with customizable names
- **Interactive Board**: Click tiles to reveal clues, mark completed tiles
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 📚 Categories

1. **Rise to Power** - The founding of the Han Dynasty and early consolidation
2. **Maintaining Power** - How the Han sustained their rule over centuries
3. **Displaying Power** - Cultural and technological achievements
4. **Decline of Power** - The fall of the Han Dynasty and its aftermath

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required - runs entirely in the browser!

### Installation

1. Clone this repository:
```bash
git clone https://github.com/YOUR_USERNAME/Han-Dynasty-Jeopardy.git
cd Han-Dynasty-Jeopardy
```

2. Open `index.html` in your web browser, or serve it using a local web server:
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

### Deployment

#### GitHub Pages (Recommended)

1. Push your code to GitHub
2. Go to your repository Settings → Pages
3. Select the `main` branch as the source
4. Your site will be available at `https://YOUR_USERNAME.github.io/Han-Dynasty-Jeopardy/`

#### Other Hosting Options

This is a static site that can be hosted on:
- Netlify
- Vercel
- Cloudflare Pages
- Any static hosting service

## 🎯 How to Play

1. **Set Up Teams**: Use the dropdown to select the number of teams (1-6)
2. **Customize Team Names**: Click on team name fields to edit them
3. **Select a Clue**: Click on any dollar amount tile to reveal the clue
4. **Read the Clue**: The prompt/question will appear in a modal
5. **Reveal the Answer**: Click "Reveal Answer" to show the expected response
6. **Review Teaching Materials**: 
   - Watch the explanation video (if available)
   - Read through the key notes
7. **Score the Clue**: Award or deduct points using the +/- buttons for each team
8. **Mark Complete**: Click "Mark Tile Complete" to lock the tile and return to the board
9. **Reset**: Use "Reset Board" to start a new game

## 🏗️ Technical Details

### Technology Stack

- **React 17**: UI framework (loaded via CDN)
- **Babel Standalone**: JSX transformation in the browser
- **Tailwind CSS**: Styling (loaded via CDN)
- **Vanilla HTML/JS**: No build process required

### Project Structure

```
Han-Dynasty-Jeopardy/
├── index.html              # Main application file
├── han_dynasty_jeopardy.html  # Alternative HTML file
├── copy_of_han_dynasty_jeopardy_final.jsx  # JSX source file
├── *.mp4                   # Video explanation files (1-20, Conclusive, etc.)
├── README.md               # This file
└── LICENSE                 # MIT License
```

### Key Components

- **HanJeopardy**: Main React component managing game state
- **Categories**: Data structure containing all clues, answers, and teaching materials
- **Team Management**: Dynamic team creation and scoring system
- **Modal System**: Clue display and answer revelation interface

## 📝 Educational Content

Each clue includes:
- **Prompt**: The question in Jeopardy format
- **Response**: The expected answer
- **Explanation Video**: Optional video teaching material
- **Key Notes**: Bulleted list of important teaching points

The content explores themes of:
- Political power and legitimacy
- Administrative systems and bureaucracy
- Cultural achievements and technological innovation
- Foreign relations and trade
- The dynamics of imperial decline

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the classic Jeopardy! game show format
- Educational content focused on Han Dynasty history
- Built for classroom and educational use

## 📧 Contact

For questions, suggestions, or feedback, please open an issue on GitHub.

---

**Note**: This is an educational tool designed for teaching about the Han Dynasty. The game format makes learning interactive and engaging while maintaining educational rigor.
