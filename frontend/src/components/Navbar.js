import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, organizer, isUserLoggedIn, isOrganizerLoggedIn, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎫 EventTickets
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Browse Events</Link>
          </li>

          {!isUserLoggedIn && !isOrganizerLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/user/login" className="nav-link">User Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/organizer/login" className="nav-link">Organizer Login</Link>
              </li>
            </>
          ) : isUserLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/my-tickets" className="nav-link">My Tickets</Link>
              </li>
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle">
                  {user?.firstName} ▼
                </button>
                <div className="dropdown-menu">
                  <Link to="/user/profile" className="dropdown-item">Profile</Link>
                  <button onClick={handleLogout} className="dropdown-item">Logout</button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/organizer/dashboard" className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle">
                  {organizer?.name} ▼
                </button>
                <div className="dropdown-menu">
                  <Link to="/organizer/profile" className="dropdown-item">Profile</Link>
                  <button onClick={handleLogout} className="dropdown-item">Logout</button>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
