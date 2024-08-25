import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Notification from './Notification';
import './Signup.css'; // Import custom CSS for additional styling

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });
    const [notification, setNotification] = useState({ show: false, message: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.location
                })
            });
    
            const json = await response.json();
    
            if (json.success) {
                if (json.token) {
                    localStorage.setItem('authToken', json.token);
                }
                setNotification({ show: true, message: "Account created successfully. Redirecting to login..." });
                setTimeout(() => navigate('/login'), 1500); // Redirect after 3 seconds
            } else {
                setNotification({ show: true, message: "Enter Valid Credentials: " + json.message });
            }
        } catch (error) {
            console.error('Error:', error);
            setNotification({ show: true, message: 'An error occurred. Please try again.' });
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    const handleCloseNotification = () => {
        setNotification({ ...notification, show: false });
    }

    return (
        <div className='signup-container'>
            {notification.show && <Notification message={notification.message} onClose={handleCloseNotification} />}
            <div className="signup-card">
                <h2 className="signup-heading">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                            name='email'
                            value={credentials.email}
                            onChange={onChange}
                            aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control"
                            name='password'
                            id="exampleInputPassword1"
                            onChange={onChange}
                            value={credentials.password} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Address</label>
                        <input type="text" className="form-control"
                            name='location'
                            id="location"
                            onChange={onChange}
                            value={credentials.location} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <div className="text-center mt-3">
                        <Link to="/login" className='btn btn-secondary'>Already a User</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
