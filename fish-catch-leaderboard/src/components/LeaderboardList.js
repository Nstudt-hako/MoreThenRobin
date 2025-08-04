import React, { useEffect, useState, useContext } from 'react';
import { getLeaderboardData } from '../api/firebase';
import { ThemeContext } from '../context/ThemeContext';
import CatchItem from './CatchItem';
import './LeaderboardList.css';

const LeaderboardList = ({ data }) => {
    const [catches, setCatches] = useState(data || []);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (data) {
            setCatches(data);
            return;
        }

        // Use the mock data function instead of Firebase collection
        const fetchData = async () => {
            try {
                const leaderboardData = await getLeaderboardData();
                setCatches(leaderboardData);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
                setCatches([]);
            }
        };

        fetchData();
    }, [data]);

    if (catches.length === 0) {
        return (
            <div className="empty-state" style={{ color: theme.text }}>
                <p>No catches recorded yet. Be the first to add one!</p>
            </div>
        );
    }

    return (
        <div className="leaderboard-list">
            {catches.map((catchData, index) => (
                <div key={catchData.id} className="leaderboard-item">
                    <div className="rank-badge" style={{ backgroundColor: theme.primary }}>
                        #{index + 1}
                    </div>
                    <CatchItem catchData={catchData} />
                </div>
            ))}
        </div>
    );
};

export default LeaderboardList;