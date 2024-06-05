import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bankLogo from '../assets/img/CIBC_logo_2021.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Ensure Bootstrap JS is imported
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
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={bankLogo} alt="Bank Logo" width="90" height="50" className="logo-animation" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-none d-lg-flex">
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

      <div className="offcanvas offcanvas-end bg-dark text-white" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/" style={{ fontSize: '1.2rem' }}>Dashboard</Link>
              </li>
            )}
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/home" style={{ fontSize: '1.2rem' }}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/deposit" style={{ fontSize: '1.2rem' }}>Deposit</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/withdraw" style={{ fontSize: '1.2rem' }}>Withdraw</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/etransfer" style={{ fontSize: '1.2rem' }}>E-Transfer</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white shake-animation" to="/" style={{ fontSize: '1.2rem', color: '#c41f3e' }} onClick={handleLogout}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white shake-animation" to="/login" style={{ fontSize: '1.2rem', color: '#c41f3e' }}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white shake-animation" to="/signup" style={{ fontSize: '1.2rem', color: '#c41f3e' }}>SignUp</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
