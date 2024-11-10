import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import '../styles/navbar.css';
import AdvoTalk from '../assets/images/AdvoTalk.png'

function Navbar() {
  // const navigate = useNavigate(); // Initialize useNavigate to navigate programmatically

  const handleRegisterClick = () => {
    // navigate('./register'); // Navigate to /register route when clicked
  };

  return (
    <div className="navbar absolute z-30">
      <div className="navbar-logo"><img src={AdvoTalk} alt="" height={1000} width={1000} className='scale-[150%]' /></div>
      <div className="navbar-container">
        <li><a href="/">HOME</a></li>
        <li><a href="/dashboard" className=''>DASHBOARD</a></li>
      </div>
      <div className="register">
        <a href="/login">

        <button className="glowing-btn">
          <span className="glowing-txt">R<span className="faulty-letter">E</span>GISTER</span>
        </button>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
