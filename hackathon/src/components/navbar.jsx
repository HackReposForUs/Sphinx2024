import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import '../styles/navbar.css';

function Navbar() {
  const navigate = useNavigate(); // Initialize useNavigate to navigate programmatically

  const handleRegisterClick = () => {
    navigate('./register'); // Navigate to /register route when clicked
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">logo</div>
      <div className="navbar-container">
        <li><a href="/">HOME</a></li>
        <li><a href="/">ABOUT US</a></li>
        <li><a href="/">SERVICES</a></li>
        <li><a href="/">CONTACT US</a></li>
      </div>
      <div className="register">
        <button className="glowing-btn" onClick={handleRegisterClick}>
          <span className="glowing-txt">R<span className="faulty-letter">E</span>GISTER</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
