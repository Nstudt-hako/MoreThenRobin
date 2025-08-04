import React, { useEffect, useState, useContext } from 'react';
import LeaderboardList from '../components/LeaderboardList';
import { getLeaderboardData } from '../api/firebase';
import { ThemeContext } from '../context/ThemeContext';

const LeaderboardScreen = () => {
    const { theme } = useContext(ThemeContext);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const data = await getLeaderboardData();
                setLeaderboardData(data);
            } catch (error) {
                // Error fetching leaderboard data - silently fail for production
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner" style={{ borderTopColor: theme.primary }}></div>
                <p style={{ color: theme.text }}>Loading leaderboard...</p>
            </div>
        );
    }

    return (
        <div className="leaderboard-container" style={{ backgroundColor: theme.background }}>
            <h1 className="leaderboard-title" style={{ color: theme.text }}>
                🏆 Leaderboard
            </h1>
            <LeaderboardList data={leaderboardData} />
        </div>
    );
};

export default LeaderboardScreen;