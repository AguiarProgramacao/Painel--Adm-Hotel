// Navbar.js (Sidebar)
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={sidebarStyle}>
      <h2 style={{ color: 'white', textAlign: 'center' }}>Admin</h2>
      <ul style={menuStyle}>
        <li><Link style={linkStyle} to="/">Dashboard</Link></li>
        <li><Link style={linkStyle} to="/hotels">Hotéis</Link></li>
        <li><Link style={linkStyle} to="/reservations">Reservas</Link></li>
        <li><Link style={linkStyle} to="/reports">Relatórios</Link></li>
      </ul>
    </div>
  );
};

const sidebarStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '250px',
  height: '100vh',
  backgroundColor: '#2c3e50',
  padding: '20px',
  color: 'white',
  boxSizing: 'border-box',
};

const menuStyle = {
  listStyleType: 'none',
  padding: 0,
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  display: 'block',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '4px',
  transition: 'background-color 0.3s',
};

export default Sidebar;
