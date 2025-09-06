import React from 'react';

export const ThemeContext = React.createContext<{ dark: boolean; setDark: (v: boolean) => void } | null>(null);

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('ThemeContext not available');
  return ctx;
};

