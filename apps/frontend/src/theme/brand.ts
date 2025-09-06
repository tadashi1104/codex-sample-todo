import type { ThemeConfig } from 'antd';
import { theme as antdTheme } from 'antd';

export const brandTheme = (dark: boolean): ThemeConfig => {
  const algorithm = dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;
  return {
    algorithm,
    token: {
      colorPrimary: '#E6001E',
      colorInfo: '#E6001E',
      colorSuccess: '#16A34A',
      colorWarning: '#F59E0B',
      colorError: '#DC2626',
      colorLink: '#E6001E',
      colorLinkHover: '#C40019',
      colorLinkActive: '#A00015',
      controlOutline: '#E6001E',
      controlOutlineWidth: 2,
      borderRadius: 8,
      fontFamily:
        'Noto Sans JP, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
      colorBgLayout: dark ? '#0f0f10' : '#ffffff',
      colorText: dark ? '#f5f5f5' : '#111111',
    },
    components: {
      Button: {
        controlHeight: 36,
        borderRadius: 8,
        defaultHoverBg: dark ? 'rgba(230,0,30,0.12)' : 'rgba(230,0,30,0.06)',
        primaryShadow: 'none',
      },
      Layout: {
        headerBg: '#E6001E',
        headerPadding: '0 24px',
        headerColor: '#ffffff',
      },
      Table: {
        borderRadius: 8,
        headerBorderRadius: 8,
        headerBg: dark ? '#1a1a1b' : '#fff4f4',
        rowHoverBg: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
      },
      Card: {
        borderRadiusLG: 10,
      },
      Tag: {
        fontSize: 12,
        borderRadiusSM: 6,
      },
      Input: {
        activeBorderColor: '#E6001E',
        hoverBorderColor: '#C40019',
      },
    },
  };
};

