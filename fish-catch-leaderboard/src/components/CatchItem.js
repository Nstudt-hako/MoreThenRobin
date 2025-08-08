import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const CatchItem = ({ catchData }) => {
    const { species, size, location, angler, timestamp, photo, verified, flagged } = catchData;
    const { theme } = useContext(ThemeContext);

    return (
        <div className="catch-item" style={{ backgroundColor: theme.surface, color: theme.text }}>
            <div className="catch-info">
                <h3 className="catch-species" style={{ color: theme.primary, display:'flex', alignItems:'center', gap:'0.5rem' }}>
                    🐟 {species || 'Unknown Species'}
                    {verified ? <span style={{ background:'#2e7d32', color:'#fff', padding:'0.15rem 0.5rem', borderRadius:'12px', fontSize:'0.65rem' }}>VERIFIED</span> : <span style={{ background:'#b26a00', color:'#fff', padding:'0.15rem 0.5rem', borderRadius:'12px', fontSize:'0.65rem' }}>PENDING</span>}
                    {flagged && <span style={{ background:'#c62828', color:'#fff', padding:'0.15rem 0.5rem', borderRadius:'12px', fontSize:'0.65rem' }}>FLAGGED</span>}
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