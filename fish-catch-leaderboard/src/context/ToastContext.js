import React, { createContext, useCallback, useContext, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export const ToastContext = createContext();

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]); // {id,type,message}
  const { theme } = useContext(ThemeContext);

  const remove = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);

  const push = useCallback((message, type='info', ttl=4000) => {
    const id = ++idCounter;
    setToasts(t => [...t, { id, type, message }]);
    if (ttl > 0) setTimeout(() => remove(id), ttl);
  }, [remove]);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div style={{ position:'fixed', bottom:'1rem', right:'1rem', display:'flex', flexDirection:'column', gap:'0.5rem', zIndex:999 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background: theme.surface, color: theme.text, border:'1px solid '+theme.primary, padding:'0.6rem 0.9rem', borderRadius:6, minWidth:220, boxShadow:'0 2px 6px rgba(0,0,0,0.2)', fontSize:'0.85rem' }}>
            <strong style={{ marginRight:4 }}>{t.type.toUpperCase()}:</strong> {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
