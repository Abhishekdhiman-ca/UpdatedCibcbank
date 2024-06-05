import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bankLogo from '../assets/img/CIBC_logo_2021.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accountNumber');
    localStorage.removeItem('isAuthenticated');
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={bankLogo} alt="Bank Logo" width="90" height="50" className="logo-animation" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{ fontSize: '1.2rem' }}>Dashboard</Link>
              </li>
            )}
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/home" style={{ fontSize: '1.2rem' }}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/deposit" style={{ fontSize: '1.2rem' }}>Deposit</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/withdraw" style={{ fontSize: '1.2rem' }}>Withdraw</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/etransfer" style={{ fontSize: '1.2rem' }}>E-Transfer</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link shake-animation" to="/" style={{ fontSize: '1.2rem', color: '#c41f3e' }} onClick={handleLogout}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link shake-animation" to="/login" style={{ fontSize: '1.2rem', color: '#c41f3e' }}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link shake-animation" to="/signup" style={{ fontSize: '1.2rem', color: '#c41f3e' }}>SignUp</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
