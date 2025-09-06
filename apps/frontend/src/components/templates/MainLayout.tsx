import React from 'react';
import { Layout, theme, Switch, Space, Tooltip } from 'antd';
import { useTheme } from '../../theme/ThemeContext';

const { Header, Content, Footer } = Layout;

export const MainLayout: React.FC<{ children: React.ReactNode }>= ({ children }) => {
  const { token } = theme.useToken();
  const { dark, setDark } = useTheme();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          color: '#fff',
          fontWeight: 700,
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(90deg, #E6001E 0%, #FF6B00 100%)',
        }}
      >
        <img src="/logo.svg" alt="Logo" width={28} height={28} style={{ marginRight: 10 }} />
        <span style={{ letterSpacing: 0.2, flex: 1 }}>Todo App</span>
        <Space>
          <Tooltip title={dark ? 'ダークモード' : 'ライトモード'}>
            <Switch
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              checked={dark}
              onChange={(v) => setDark(v)}
            />
          </Tooltip>
        </Space>
      </Header>
      <Content style={{ padding: 24, background: token.colorBgLayout }}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>Built with Ant Design</Footer>
    </Layout>
  );
};
