import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import A from "../assets/img/img1.webp";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [message, setMessage] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [lastAccountNumber, setLastAccountNumber] = useState(1000);
  const navigate = useNavigate();

  const url = "https://json-storage-api.p.rapidapi.com/datalake";
  const headers = {
    "content-type": "application/json",
    "X-RapidAPI-Key": "737b5b8023msh5dc8759b04faf33p1be655jsn98f86fc2f298",
    "X-RapidAPI-Host": "json-storage-api.p.rapidapi.com",
  };

  useEffect(() => {
    loadUsers();
    getLastAccountNumber();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          "@context": [
            "http://schema4i.org/Thing.jsonld",
            "http://schema4i.org/Action.jsonld",
            "http://schema4i.org/SearchAction.jsonld",
          ],
          "@type": "SearchAction",
          Object: {
            "@context": [
              "http://schema4i.org/Thing.jsonld",
              "http://schema4i.org/Filter",
              "http://schema4i.org/DataLakeItem",
              "http://schema4i.org/UserAccount",
            ],
            "@type": "Filter",
            FilterItem: {
              "@type": "DataLakeItem",
              Creator: {
                "@type": "UserAccount",
                Identifier: "USERID-1000",
              },
            },
          },
        }),
      });
      const data = await response.json();
      const users = data.Result.ItemListElement
        .map((item) => item.Item)
        .filter((item) => item.About["@type"] === "UserAccount");
      setRegisteredUsers(users);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const getLastAccountNumber = async () => {
    try {
      // Fetch the last account number from your data storage
      // For now, let's assume you're fetching it from an API endpoint
      const response = await fetch("https://your-api.com/last-account-number");
      const data = await response.json();
      setLastAccountNumber(data.lastAccountNumber); // Update the state with the fetched value
    } catch (error) {
      console.error("Error fetching last account number:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { // Check if passwords match
      setMessage("Passwords do not match");
      return;
    }

    try {
      const newAccountNumber = lastAccountNumber + registeredUsers.length + 1;
      const accountId = ` 'USERID-' + ${newAccountNumber}`;
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          "@context": [
            "http://schema4i.org/Thing.jsonld",
            "http://schema4i.org/Action.jsonld",
            "http://schema4i.org/CreateAction.jsonld",
          ],
          "@type": "CreateAction",
          Result: {
            "@context": [
              "http://schema4i.org/DataLakeItem.jsonld",
              "http://schema4i.org/UserAccount.jsonld",
            ],
            "@type": "DataLakeItem",
            Name: `${firstName} ${lastName}`,
            Creator: {
              "@type": "UserAccount",
              Identifier: "USERID-1000",
            },
            About: {
              "@type": "UserAccount",
              FirstName: firstName,
              LastName: lastName,
              Email: email,
              Password: password,
              AccountNumber: newAccountNumber,
              AccountId: accountId,
            },
          },
        }),
      });

      if (response.ok) {
        setMessage("Signup successful! Redirecting to login...");
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("accountId", accountId);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        loadUsers();
      } else {
        setMessage("Error signing up. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setMessage("Error signing up. Please try again.");
    }
  };

  const handleClearUsers = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          "@context": [
            "http://schema4i.org/Thing.jsonld",
            "http://schema4i.org/Action.jsonld",
            "http://schema4i.org/DeleteAction.jsonld",
          ],
          "@type": "DeleteAction",
          Object: {
            "@context": [
              "http://schema4i.org/Thing.jsonld",
              "http://schema4i.org/Filter",
              "http://schema4i.org/DataLakeItem",
              "http://schema4i.org/UserAccount",
            ],
            "@type": "Filter",
            FilterItem: {
              "@type": "DataLakeItem",
              Creator: {
                "@type": "UserAccount",
                Identifier: "USERID-1000",
              },
              About: {
                "@type": "UserAccount",
              },
            },
          },
        }),
      });

      if (response.ok) {
        setMessage("All registered users cleared successfully.");
        setRegisteredUsers([]);
      } else {
        const errorData = await response.json();
        console.error("Error clearing registered users:", errorData);
        setMessage("Error clearing registered users. Please try again.");
      }
    } catch (error) {
      console.error("Error clearing users:", error);
      setMessage("Error clearing registered users. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={A}
              alt="signup form"
              className="img-fluid rounded-start w-100"
            />
          </div>
          <div className="col-md-6">
            <div className="card-body d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <i className="bi bi-cube-fill text-warning fs-1 me-3"></i>
                <h1 className="fw-bold mb-0">
                  <span className="text-danger">CIBC</span> Bank
                </h1>
              </div>
              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign Up your account
              </h5>
              <form onSubmit={handleSignUp}>
                <div className="mb-4">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="form-control form-control-lg"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control form-control-lg"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
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
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control form-control-lg"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {message && (
                  <div
                    className={`alert ${
                      message.includes("successful") || message.includes("Passwords do not match")
                        ? "alert-danger"
                        : "alert-success"
                    }`}
                    role="alert"
                  >
                    {message}
                  </div>
                )}
                <button type="submit" className="btn btn-dark btn-lg mb-4 px-5">
                  Sign Up
                </button>
              </form>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Already have an account?{" "}
                <a href="/login" style={{ color: "#393f81" }}>
                  Login here
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
      {/* Display registered user credentials */}
      {/* <div
        className="d-flex flex-column justify-content-center align-items-center my-5"
        style={{ height: "auto" }}
      >
        <h2>Registered Users</h2>
        <ul>
          {registeredUsers.map((user, index) => (
            <li key={index}>
              Name: {user.Name}, Email: {user.About.Email}, Password:{" "}
              {user.About.Password}, Account Number: {user.About.AccountNumber}
            </li>
          ))}
        </ul>
        <button onClick={handleClearUsers} className="btn btn-danger">
          Clear All Users
        </button>
      </div> */}
    </div>
  );
};

export default SignUp;
