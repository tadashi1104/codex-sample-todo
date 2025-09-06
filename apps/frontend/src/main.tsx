import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { App } from './ui/App';
import 'antd/dist/reset.css';
import { brandTheme } from './theme/brand';
import { ThemeProvider } from './theme/ThemeContext';
import './styles/global.css';

const el = document.getElementById('root');
if (el) {
  const root = createRoot(el);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  const initialDark = saved ? saved === 'dark' : prefersDark;
  function Root() {
    const [dark, setDark] = React.useState<boolean>(initialDark);
    React.useEffect(() => {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    }, [dark]);
    return (
      <ThemeProvider value={{ dark, setDark }}>
        <ConfigProvider theme={brandTheme(dark)}>
          <App />
        </ConfigProvider>
      </ThemeProvider>
    );
  }
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
  );
}
