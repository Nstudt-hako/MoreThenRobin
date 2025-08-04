# More Than Robin - Fish Catch Leaderboard

Eine vereinfachte Web-Anwendung zum Verfolgen und Vergleichen von Angelausgängen zwischen Anglern.

## 🌐 Live Demo

Die App ist auf GitHub Pages verfügbar: [https://Nstudt-hako.github.io/MoreThenRobin](https://Nstudt-hako.github.io/MoreThenRobin)

## ✨ Features

- **Leaderboard**: Sieh die größten Fänge aller Angler
- **Responsive Design**: Funktioniert auf Desktop und Mobile
- **Dark/Light Theme**: Automatische Theme-Erkennung mit manueller Umschaltung
- **Vereinfachte Architektur**: Reduzierte Komplexität für bessere Wartbarkeit

## 🚀 Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm start

# Build für Produktion erstellen und deployen
npm run deploy
```

## 🏗️ Vereinfachungen (August 2025)

Die Anwendung wurde vereinfacht, um Overhead zu reduzieren:

- **Konsolidierte CSS**: Alle Styles in einer einzigen `main.css` Datei
- **Vereinfachtes Theme-System**: Themes direkt in ThemeContext definiert
- **Reduzierte Dependencies**: Firebase und unnötige dev-dependencies entfernt
- **Vereinfachte API**: Streamlined mock data structure
- **Weniger Helper Functions**: Nur noch die wichtigsten Utility-Funktionen
- **Optimiertes Routing**: Vereinfachte Route-Struktur

## 📁 Projektstruktur

```
src/
├── components/        # React-Komponenten
├── context/          # React Context (Auth & Theme)
├── screens/          # Screen-Komponenten
├── utils/            # Utility-Funktionen
├── api/              # Mock API
└── main.css          # Alle Styles
```

# Linting
npm run lint
```

## 📦 Deployment

Die App wird automatisch über GitHub Actions auf GitHub Pages deployed, wenn Änderungen in den `main` Branch gepusht werden.

### Manuelle Deployment

```bash
# Build erstellen und auf GitHub Pages deployen
npm run deploy
```

## 🛠 Technologie-Stack

- **Frontend**: React 18
- **Routing**: React Router v6
- **Styling**: CSS3 mit CSS-in-JS
- **Build**: Create React App
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📱 Browser-Unterstützung

- Chrome (aktuelle Version)
- Firefox (aktuelle Version)
- Safari (aktuelle Version)
- Edge (aktuelle Version)

## 🎣 Über das Projekt

"More Than Robin" ist eine Anwendung für Angler, um ihre Fänge zu dokumentieren und mit anderen zu vergleichen. Die App wurde von einer React Native Anwendung zu einer Progressive Web App umgebaut, um eine breitere Verfügbarkeit zu ermöglichen.

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

## Project Structure

```
fish-catch-leaderboard
├── src
│   ├── api
│   │   └── firebase.js
│   ├── components
│   │   ├── AddCatchForm.js
│   │   ├── CatchItem.js
│   │   ├── LeaderboardList.js
│   │   └── ThemeToggle.js
│   ├── context
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── navigation
│   │   └── AppNavigator.js
│   ├── screens
│   │   ├── AddCatchScreen.js
│   │   ├── HomeScreen.js
│   │   ├── LeaderboardScreen.js
│   │   ├── LoginScreen.js
│   │   └── ProfileScreen.js
│   ├── theme
│   │   ├── colors.js
│   │   └── theme.js
│   ├── utils
│   │   └── helpers.js
│   └── App.js
├── android
├── ios
├── .env
├── .gitignore
├── app.json
├── babel.config.js
├── index.js
├── metro.config.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/fish-catch-leaderboard.git
   ```
2. Navigate to the project directory:
   ```
   cd fish-catch-leaderboard
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up Firebase configuration in the `.env` file.
5. Run the app:
   ```
   npm start
   ```

## Usage

- Users can log in to their accounts or create new ones.
- Navigate to the "Add Catch" screen to input new catch details.
- View the leaderboard to see the best catches by all users.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.