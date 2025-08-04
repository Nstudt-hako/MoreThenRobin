import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import LeaderboardList from '../components/LeaderboardList';
import { FirebaseContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const LeaderboardScreen = () => {
  const [catches, setCatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchCatches } = useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  useEffect(() => {
    const loadCatches = async () => {
      try {
        const data = await fetchCatches();
        setCatches(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCatches();
  }, [fetchCatches]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Text style={{ fontSize: 24, color: theme.text, textAlign: 'center', marginVertical: 20 }}>Leaderboard</Text>
      <FlatList
        data={catches}
        renderItem={({ item }) => <LeaderboardList catchItem={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default LeaderboardScreen;