import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import custom CSS for additional styling
import Notification from './Notification'; // Import Notification component

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5002/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const json = await response.json();

      if (!json.success) {
        setNotification({ show: true, message: "Invalid credentials. Please try again.", type: "error" });
      } else {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("userName", json.name);


        setNotification({ show: true, message: "Login successful! Redirecting...", type: "success" });
        setTimeout(() => navigate("/"), 1500); // Redirect after 1.5 seconds
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({ show: true, message: 'An error occurred. Please try again.', type: "error" });
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, show: false });
  };

  return (
    <div className="login-container">
      {notification.show && <Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />}
      <div className="login-card">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name='email'
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name='password'
              id="exampleInputPassword1"
              onChange={onChange}
              value={credentials.password}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <div className="text-center mt-3">
            <Link to="/createuser" className='btn btn-secondary w-100'>New User</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
