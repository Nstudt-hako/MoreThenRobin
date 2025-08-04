# Fish Catch Leaderboard

This project is a mobile application built with React Native that allows users to track their fishing catches and view a leaderboard of personal bests. The app supports both Android and iOS platforms and features dark mode support with a material design aesthetic.

## Features

- **Leaderboard**: Displays the best catches per type and size for every user.
- **Add Catch**: Users can add their catches with details such as fish type, size, and time of catch.
- **User Authentication**: Secure login for users to manage their profiles and catches.
- **Dark Mode Support**: Users can toggle between light and dark themes.
- **Material Design**: The app follows material design principles for a modern look and feel.

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