// src/components/Sidebar/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  TeamOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import './Sidebar.css';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label: <Link to={key}>{label}</Link> };
}

const items = [
  getItem('Dashboard', '/dashboard', <DashboardOutlined />),
  getItem('Contas', '/contas', <TeamOutlined />),
  getItem('Mensagens', '/mensagens', <MessageOutlined />),
];

const placeholderLogoUrl = "https://i.imgur.com/DVNkfll.png";

const Sidebar = ({ collapsed, onCollapse }) => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    const currentPath = location.pathname === '/' ? '/dashboard' : location.pathname;
    setSelectedKeys([currentPath]);
  }, [location.pathname]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="dark"
      width={220}
      collapsedWidth={80}
      breakpoint="lg"
      style={{
        overflow: 'auto', height: '100vh', position: 'fixed',
        left: 0, top: 0, bottom: 0,
        zIndex: 1000, // **** ADICIONADO Z-INDEX ALTO ****
      }}
    >
      <div className="logo-container">
        {collapsed ? (
          <img src={placeholderLogoUrl} alt="Logo" className="collapsed-logo" />
        ) : (
          <span className="logo-text">SaldoZap</span>
        )}
      </div>
      <Menu
        theme="dark" mode="inline" selectedKeys={selectedKeys}
        items={items} className="sidebar-menu"
      />
    </Sider>
  );
};

export default Sidebar;