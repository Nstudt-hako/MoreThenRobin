import React, { useEffect, useState, useContext } from 'react';
import LeaderboardList from '../components/LeaderboardList';
import { filterLeaderboard, getSpeciesList } from '../api/firebase';
import { ThemeContext } from '../context/ThemeContext';

const LeaderboardScreen = () => {
    const { theme } = useContext(ThemeContext);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [speciesOptions, setSpeciesOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ species: '', timeframe: 'all', search: '', sort: 'size', onlyVerified: true });

    const updateFilter = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    useEffect(() => {
        const loadSpecies = async () => {
            try { setSpeciesOptions(await getSpeciesList()); } catch { /* ignore */ }
        };
        loadSpecies();
    }, []);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            setLoading(true);
            try {
                const data = await filterLeaderboard(filters);
                setLeaderboardData(data);
            } catch (error) {
                setLeaderboardData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, [filters]);

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
            <h1 className="leaderboard-title" style={{ color: theme.text }}>🏆 Leaderboard</h1>
            <div className="filter-bar" style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <select name="species" value={filters.species} onChange={updateFilter}>
                    <option value="">All Species</option>
                    {speciesOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select name="timeframe" value={filters.timeframe} onChange={updateFilter}>
                    <option value="all">All Time</option>
                    <option value="24h">Last 24h</option>
                    <option value="7d">Last 7d</option>
                    <option value="30d">Last 30d</option>
                </select>
                <select name="sort" value={filters.sort} onChange={updateFilter}>
                    <option value="size">Size (desc)</option>
                    <option value="recent">Most Recent</option>
                </select>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <input type="checkbox" name="onlyVerified" checked={filters.onlyVerified} onChange={updateFilter} /> Verified only
                </label>
                <input
                    type="search"
                    name="search"
                    value={filters.search}
                    onChange={updateFilter}
                    placeholder="Search species / angler"
                    style={{ flex: '1 1 220px' }}
                />
            </div>
            <LeaderboardList data={leaderboardData} />
        </div>
    );
};

export default LeaderboardScreen;