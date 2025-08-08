import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { listUserGroups, createGroup, joinGroupByInvite, groupLeaderboard } from '../api/firebase';

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]); // user groups
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!user) { setGroups([]); setActiveGroupId(null); return; }
      setLoading(true);
      try {
        const g = await listUserGroups(user.email);
        setGroups(g);
        if (g.length && !activeGroupId) setActiveGroupId(g[0].id);
      } finally { setLoading(false); }
    };
    load();
  }, [user]);

  const addGroup = async (name) => {
    if (!user) return null;
    const g = await createGroup(name, user.email);
    setGroups(prev => [...prev, g]);
    setActiveGroupId(g.id);
    return g;
  };

  const joinByToken = async (token) => {
    if (!user) return null;
    const g = await joinGroupByInvite(token, user.email);
    if (g) {
      setGroups(prev => prev.find(x => x.id === g.id) ? prev : [...prev, g]);
      setActiveGroupId(g.id);
    }
    return g;
  };

  const loadGroupLeaderboard = (criteria) => {
    if (!activeGroupId) return Promise.resolve({ data: [], total:0, page:1, pageSize:criteria?.pageSize||10 });
    return groupLeaderboard(activeGroupId, criteria);
  };

  return (
    <GroupContext.Provider value={{ groups, activeGroupId, setActiveGroupId, addGroup, joinByToken, loading, loadGroupLeaderboard }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => useContext(GroupContext);
