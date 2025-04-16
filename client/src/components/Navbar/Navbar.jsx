import React from 'react';
import './NavbarStyles.css';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldPlus } from "lucide-react";
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userName, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav-container">
      <Link to="/" className="nav-logo">
        Depression Detection AI
        <ShieldPlus size={28} className="feature-icon" />
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/depression-test">Depression Test</Link>
        <Link to="/features">Features</Link>
        {isLoggedIn ? (
          <div className="user-info">
            <span>Welcome, {userName}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
