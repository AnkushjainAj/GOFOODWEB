import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import Modal from '../Modal';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const data = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the user's email from localStorage
    const storedEmail = localStorage.getItem("userEmail");
    console.log("Stored Email:", storedEmail); // Debugging line to ensure the email is fetched
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const isAuthenticated = !!localStorage.getItem("authToken");

  // Extract the part before '@' from the email
  const getUsername = (email) => {
    return email.split('@')[0];
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'linear-gradient(45deg, #ff7e5f, #feb47b)', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', fontFamily: 'Poppins, sans-serif' }}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Gofood_logo.svg" // Replace with the path to your logo image
            alt="GoFood Logo" 
            style={{ height: '40px', marginRight: '10px' }} 
          />
        
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link fs-5" aria-current="page" to="/" style={{ color: '#ffffff', fontWeight: 500 }}>Home</Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link fs-5" aria-current="page" to="/myOrder" style={{ color: '#ffffff', fontWeight: 500 }}>My Orders</Link>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center">
            {!isAuthenticated ? (
              <>
                <Link className="btn bg-white mx-1" to="/login">Login</Link>
                <Link className="btn bg-white mx-1" to="/createuser">Signup</Link>
              </>
            ) : (
              <>
                <span 
                  className="text-light mx-2" 
                  style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' 
                  }}
                >
                  Hi, {getUsername(userEmail)}
                </span>
                <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                  My Cart {" "}
                  <Badge pill bg="danger">
                    {data.length === 0 ? "" : data.length}
                  </Badge>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
