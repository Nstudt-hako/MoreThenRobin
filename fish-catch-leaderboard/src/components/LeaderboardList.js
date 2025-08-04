import React, { useEffect, useState, useContext } from 'react';
import { db } from '../api/firebase';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import CatchItem from './CatchItem';
import './LeaderboardList.css';

const LeaderboardList = ({ data }) => {
    const [catches, setCatches] = useState(data || []);
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (data) {
            setCatches(data);
            return;
        }

        const unsubscribe = db.collection('catches')
            .orderBy('size', 'desc')
            .onSnapshot(snapshot => {
                const catchesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCatches(catchesData);
            });

        return () => unsubscribe();
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