import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navStyle = {
  padding: '0.5rem 2rem',
  background: '#1976d2',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  marginBottom: 24
};
const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  marginRight: 24,
  fontWeight: 500,
  fontSize: 17,
  padding: '6px 12px',
  borderRadius: 6,
  transition: 'background 0.2s'
};
const activeStyle = {
  background: 'rgba(255,255,255,0.18)'
};

const Navigation = () => {
  const location = useLocation();
  return (
    <nav style={navStyle}>
      <span style={{ fontWeight: 700, fontSize: 22, color: '#fff', marginRight: 36, letterSpacing: 1 }}>Disaster Response</span>
      <Link to="/" style={{ ...linkStyle, ...(location.pathname === '/' ? activeStyle : {}) }}>Home</Link>
      <Link to="/disasters" style={{ ...linkStyle, ...(location.pathname === '/disasters' ? activeStyle : {}) }}>Disasters</Link>
      <Link to="/resources" style={{ ...linkStyle, ...(location.pathname === '/resources' ? activeStyle : {}) }}>Resources</Link>
      <Link to="/social" style={{ ...linkStyle, ...(location.pathname === '/social' ? activeStyle : {}) }}>Social</Link>
    </nav>
  );
};

export default Navigation; 