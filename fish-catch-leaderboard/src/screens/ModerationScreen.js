import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { queryCatches, verifyCatch, flagCatch } from '../api/firebase';
import CatchItem from '../components/CatchItem';

const ModerationScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { isAdmin } = useContext(AuthContext);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await queryCatches(c => (!c.verified || c.flagged) && !c.isDeleted);
      setPending(data);
    } catch (e) {
      setError('Could not load moderation queue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const doVerify = async (id) => {
    try { await verifyCatch(id); await load(); } catch { /* ignore */ }
  };
  const doFlag = async (id) => {
    try { await flagCatch(id, 'manual-flag'); await load(); } catch { /* ignore */ }
  };

  if (!isAdmin) {
    return <div style={{ padding: '2rem', color: theme.text }}><h1 style={{ color: theme.primary }}>Moderation</h1><p>Admin access required.</p></div>;
  }

  return (
    <div style={{ padding: '2rem', color: theme.text }}>
      <h1 style={{ color: theme.primary }}>Moderation Queue</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: theme.error }}>{error}</p>}
      {!loading && pending.length === 0 && <p>No items pending verification.</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {pending.map(item => (
          <div key={item.id} style={{ position: 'relative' }}>
            <CatchItem catchData={item} />
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
              {!item.verified && <button className="btn" style={{ padding: '0.4rem 0.8rem' }} onClick={() => doVerify(item.id)}>Verify</button>}
              {!item.flagged && <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem' }} onClick={() => doFlag(item.id)}>Flag</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModerationScreen;
