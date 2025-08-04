import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import LeaderboardList from '../components/LeaderboardList';
import { AuthContext } from '../context/AuthContext';
import { getLeaderboardData } from '../api/firebase';
import { ThemeContext } from '../context/ThemeContext';

const LeaderboardScreen = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const data = await getLeaderboardData();
                setLeaderboardData(data);
            } catch (error) {
                console.error("Error fetching leaderboard data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: theme.text }]}>Leaderboard</Text>
            <LeaderboardList data={leaderboardData} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default LeaderboardScreen;