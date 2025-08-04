# More Than Robin

Ein Web-basiertes Fish Catch Leaderboard für Angler.

## 🎣 Über das Projekt

"More Than Robin" ist eine Progressive Web App, die es Anglern ermöglicht, ihre Fänge zu dokumentieren und in einem Leaderboard mit anderen zu vergleichen. Die Anwendung wurde vollständig für das Web optimiert und kann als GitHub Pages Website gehostet werden.

## 📂 Projektstruktur

```
fish-catch-leaderboard/
├── public/                 # Statische Web-Assets
├── src/
│   ├── components/        # React-Komponenten
│   ├── screens/          # Screen-Komponenten (Seiten)
│   ├── context/          # React Context für State Management
│   ├── api/              # API-Funktionen und Mock-Daten
│   ├── theme/            # Theme-Konfiguration
│   └── utils/            # Hilfsfunktionen
├── .github/workflows/    # GitHub Actions für CI/CD
└── README.md
```

## 🚀 Live Demo

Die App ist verfügbar unter: [https://Nstudt-hako.github.io/MoreThenRobin](https://Nstudt-hako.github.io/MoreThenRobin)

## 🛠 Lokale Entwicklung

```bash
cd fish-catch-leaderboard
npm install
npm start
```

## 📦 Features

- **Responsive Design**: Funktioniert auf Desktop und Mobile
- **Dark/Light Mode**: Automatische Theme-Erkennung
- **Leaderboard**: Vergleiche Fänge nach Größe
- **Progressive Web App**: Kann wie eine native App installiert werden

## 🔧 Deployment

Das Projekt wird automatisch über GitHub Actions auf GitHub Pages deployed, wenn Änderungen in den `main` Branch gepusht werden.

---

Dieses Projekt wurde von einer React Native App zu einer Web-App konvertiert, um eine breitere Verfügbarkeit und einfachere Wartung zu ermöglichen.