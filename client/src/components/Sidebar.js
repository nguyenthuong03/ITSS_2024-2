import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Skibidi</h1>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              <span className="nav-icon">🏠</span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/tasks" className={isActive('/tasks') ? 'active' : ''}>
              <span className="nav-icon">📝</span>
              <span>Nhiệm vụ cá nhân</span>
            </Link>
          </li>
          <li>
            <Link to="/rank" className={isActive('/rank') ? 'active' : ''}>
              <span className="nav-icon">🏆</span>
              <span>Rank</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
              <span className="nav-icon">👤</span>
              <span>Thông tin cá nhân</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar; 