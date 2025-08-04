import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const CatchItem = ({ catchData }) => {
    const { species, size, location, angler, timestamp, photo } = catchData;
    const { theme } = useContext(ThemeContext);

    return (
        <div className="catch-item" style={{ backgroundColor: theme.surface, color: theme.text }}>
            <div className="catch-info">
                <h3 className="catch-species" style={{ color: theme.primary }}>
                    🐟 {species || 'Unknown Species'}
                </h3>
                <div className="catch-details">
                    <p><strong>Size:</strong> {size} cm</p>
                    <p><strong>Angler:</strong> {angler || 'Anonymous'}</p>
                    {location && <p><strong>Location:</strong> {location}</p>}
                    <p><strong>Caught:</strong> {new Date(timestamp?.toDate ? timestamp.toDate() : timestamp).toLocaleDateString()}</p>
                </div>
            </div>
            {photo && (
                <div className="catch-photo">
                    <img src={photo} alt={`${species} catch`} />
                </div>
            )}
        </div>
    );
};

export default CatchItem;