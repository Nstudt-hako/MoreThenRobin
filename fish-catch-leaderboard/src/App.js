import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import HomeScreen from './screens/HomeScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import AddCatchScreen from './screens/AddCatchScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import Navigation from './components/Navigation';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router basename="/MoreThenRobin">
          <div className="App">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/leaderboard" element={<LeaderboardScreen />} />
                <Route path="/add-catch" element={<AddCatchScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;