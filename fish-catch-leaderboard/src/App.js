import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import HomeScreen from './screens/HomeScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import AddCatchScreen from './screens/AddCatchScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ModerationScreen from './screens/ModerationScreen';
import PersonalBestsScreen from './screens/PersonalBestsScreen';
import GroupManagementScreen from './screens/GroupManagementScreen';
import MobileNav from './components/MobileNav';
import { ToastProvider } from './context/ToastContext';
import { GroupProvider } from './context/GroupContext';
import Navigation from './components/Navigation';
import './main.css';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
  <ToastProvider>
  <GroupProvider>
  <Router basename="/MoreThenRobin">
          <div className="App">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/leaderboard" element={<LeaderboardScreen />} />
                <Route path="/add-catch" element={<AddCatchScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/moderation" element={<ModerationScreen />} />
                <Route path="/personal-bests" element={<PersonalBestsScreen />} />
                <Route path="/groups" element={<GroupManagementScreen />} />
              </Routes>
            </main>
            <MobileNav />
          </div>
  </Router>
  </GroupProvider>
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;