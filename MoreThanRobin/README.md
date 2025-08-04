# Fish Catch Leaderboard App

This project is a React Native application named "MoreThanRobin" designed to track and display fish catches in a leaderboard format. Users can log their catches, view their personal bests, and see how they rank against others.

## Features

- **User Authentication**: Users can log in to track their catches.
- **Add Catch**: Users can add details of their fish catches, including type, size, and time.
- **Leaderboard**: Displays the best catches grouped by fish type and size.
- **Dark Mode Support**: Users can toggle between light and dark themes.
- **Material Design**: The app follows Material Design guidelines for a modern look and feel.

## Project Structure

- **src/api/firebase.js**: Configuration and functions for Firebase interaction, including authentication and database operations for catch data.
- **src/components**: Contains reusable components such as forms and lists.
- **src/context**: Manages authentication and theme contexts.
- **src/navigation**: Handles navigation settings and screen definitions.
- **src/screens**: Contains the main screens of the app.
- **src/theme**: Defines color palettes and theme configurations.
- **src/utils**: Contains helper functions used throughout the app.
- **android**: Android-specific configuration files and resources.
- **ios**: iOS-specific configuration files and resources.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd MoreThanRobin
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the app:
   - For Android:
     ```
     npm run android
     ```
   - For iOS:
     ```
     npm run ios
     ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.