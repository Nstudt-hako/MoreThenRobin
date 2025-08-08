# More Than Robin

Ein Web-basiertes Fish Catch Leaderboard für Angler.

## 🎣 Über das Projekt

"More Than Robin" ist eine Progressive Web App, die es Anglern ermöglicht, ihre Fänge zu dokumentieren und in einem Leaderboard mit anderen zu vergleichen. Die Anwendung wurde vollständig für das Web optimiert und kann als GitHub Pages Website gehostet werden.

## Development Status

This application now runs fully without a real backend. A mock in-memory service (see `fish-catch-leaderboard/src/api/firebase.js`) simulates typical CRUD style calls that would later be replaced by Firebase / another backend.

## Features (Demo)

- Light/Dark theme toggle (persisted in `localStorage`)
- Mock authentication (single demo user email only)
- Add fishing catches (stored in-memory until reload)
- Leaderboard sorted by catch size
- Responsive layout

## Tech Stack

- React 18 (Create React App tooling)
- React Router v6
- GitHub Actions deployment to GitHub Pages

## Project Structure (Relevant)

```
fish-catch-leaderboard/
	src/
		api/firebase.js         # Mock data & service layer
		context/                # Auth & Theme contexts
		screens/                # Top-level pages
		components/             # Reusable UI components
		utils/                  # Small pure helper functions
```

## Mock Service Layer

`firebase.js` exports:

- `getLeaderboardData()` – returns sorted catches
- `addCatch(data)` – adds a new catch with generated id & timestamp
- `seedCatches(seed)` – replaces in-memory store (useful for tests)
- `queryCatches(predicate)` – simple filter helper

> NOTE: Data resets on every page reload. Replace this file with real Firebase logic later.

## Running Locally

```bash
cd fish-catch-leaderboard
npm install
npm start
```

App will be served at http://localhost:3000 (default CRA port).

## Build

```bash
npm run build
```

Outputs production assets to `build/`.

## Deployment (GitHub Pages)

Automated via GitHub Actions workflow `.github/workflows/deploy.yml` on push to `main`.

Manual trigger:

```bash
git push origin main
```

Or run locally (requires `gh-pages` package already present):

```bash
npm run deploy
```

Ensure repository Settings → Pages is configured to serve from `gh-pages` branch (root).

## Clean Code Notes

- Pure presentational components separated from data fetching (`LeaderboardList`).
- JSDoc typedefs for mock data domain (`CatchRecord`).
- Central constants for initial form state.
- Minimal state surface; derived values computed on demand.
- No console logging in UI path except guarded error in dev-esque scenario (could be removed for prod hardening).

## Next Steps (Optional)

- Replace mock service with real Firebase (Firestore + Auth)
- Add image upload (Firebase Storage / Upload widget)
- Add pagination / filters (species, location)
- Introduce unit tests for service & helpers
- Add ESLint + Prettier for consistent formatting

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


## 🔧 Deployment

Das Projekt wird automatisch über GitHub Actions auf GitHub Pages deployed, wenn Änderungen in den `main` Branch gepusht werden.


Dieses Projekt wurde von einer React Native App zu einer Web-App konvertiert, um eine breitere Verfügbarkeit und einfachere Wartung zu ermöglichen.