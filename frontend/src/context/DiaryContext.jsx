import { createContext, useContext, useState } from 'react';

const DiaryContext = createContext();

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error('useDiary must be used within DiaryProvider');
  }
  return context;
};

export const DiaryProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <DiaryContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </DiaryContext.Provider>
  );
};