// Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import A from '../assets/img/img1.webp';

const Login = ({ onLogin, isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const url = 'https://json-storage-api.p.rapidapi.com/datalake';
  const headers = {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '737b5b8023msh5dc8759b04faf33p1be655jsn98f86fc2f298',
    'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com',
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      loadUsers();
    }
  }, [isAuthenticated, navigate]);

  const loadUsers = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          '@context': [
            'http://schema4i.org/Thing.jsonld',
            'http://schema4i.org/Action.jsonld',
            'http://schema4i.org/SearchAction.jsonld',
          ],
          '@type': 'SearchAction',
          Object: {
            '@context': [
              'http://schema4i.org/Thing.jsonld',
              'http://schema4i.org/Filter',
              'http://schema4i.org/DataLakeItem',
              'http://schema4i.org/UserAccount',
            ],
            '@type': 'Filter',
            FilterItem: {
              '@type': 'DataLakeItem',
              Creator: {
                '@type': 'UserAccount',
                Identifier: 'USERID-1000',
              },
            },
          },
        }),
      });
      const data = await response.json();
      setUsers(data.Result.ItemListElement.map((item) => item.Item));
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.About.Email === email && user.About.Password === password
    );
    if (user) {
      const accountNumber = user.About.AccountNumber;
      localStorage.setItem('accountNumber', accountNumber);
      localStorage.setItem('isAuthenticated', true);
      setMessage('Login successful! Redirecting to HomePage...');
      setTimeout(() => {
        if (onLogin) {
          onLogin(accountNumber);  // Pass account number to onLogin
        }
        navigate('/');
      }, 2000);
    } else {
      setMessage('Invalid email or password');
    }
  };

  return (
    <div className="container my-5">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-6">
            <img src={A} alt="login form" className="img-fluid rounded-start w-100" />
          </div>
          <div className="col-md-6">
            <div className="card-body d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <i className="bi bi-cube-fill text-warning fs-1 me-3"></i>
                <h1 className="fw-bold mb-0">
                  <span className="text-danger">CIBC</span> Bank
                </h1>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Login into your account
              </h5>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {message && (
                  <div
                    className={`alert ${message.includes("successful") ? "alert-success" : "alert-danger"}`}
                    role="alert"
                  >
                    {message}
                  </div>
                )}
                <button type="submit" className="btn btn-dark btn-lg mb-4 px-5">
                  Login
                </button>
              </form>
              <a href="#!" className="small text-muted">
                Forgot password?
              </a>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Don't have an account?{' '}
                <a href="./Signup" style={{ color: '#393f81' }}>
                  Register here
                </a>
              </p>
              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
