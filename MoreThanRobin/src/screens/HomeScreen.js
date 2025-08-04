import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LeaderboardList from '../components/LeaderboardList';
import ThemeToggle from '../components/ThemeToggle';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fish Catch Leaderboard</Text>
      <ThemeToggle />
      <LeaderboardList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;