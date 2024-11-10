import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../styles/HomePage.css';
import Navbar from './navbar';
import Gallery from './gallery';
import { BackgroundBeams } from './ui/backgroundBeams';

function InfoBox({ title, description, icon }) {
  return (
    <div className="info-box">
      <div className="info-header">
        {icon}
        <h3 className="info-title">{title}</h3>
      </div>
      <p className="info-description">{description}</p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <BackgroundBeams className="absolute z-0" />
      <div className="app absolute z-10">
        <Navbar />
        <main className="main">
          <div className="hello">
                            <div className="intro relative">
                                <h1>Anonymous Legal Chat</h1>
                                <p className="h">Confidential Conversations, Secured</p>
                                <Gallery />
                                {/* <button className='blackBtn' >REGISTER</button> */}
                            </div>
                            <div className="pic relative">
                                <img src="public/images.png " alt="background"  />
                            </div>
       </div>

          <section className="info-section">
            <InfoBox
              title="Complete Anonymity"
              description="Discuss sensitive legal matters without revealing your identity."
              icon={<span className="icon">🔒</span>}
            />
            <InfoBox
              title="End-to-End Encryption"
              description="Your conversations are protected from third parties at all times."
              icon={<span className="icon">🔐</span>}
            />
            <InfoBox
              title="Legal Experts"
              description="Connect with professional lawyers in a secure environment."
              icon={<span className="icon">👥</span>}
            />
          </section>

          <div className="chat-button-container">
            <button className="chat-button">
              <span className="chat-icon">💬</span> Start Anonymous Chat
            </button>
          </div>
        </main>

        <footer className="footer">
  <div className="footer-container">
    <div className="footer-section">
      <h2>LegalShield</h2>
      <p>Your secure platform for anonymous legal consultations.</p>
    </div>

    <div className="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#home" id="home-link">Home</a></li>
        <li><a href="/dashboard" id="about-link">Dashboard</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h3>Social Media</h3>
      <ul className="social-links">
        <li><a href="https://facebook.com" target="_blank" id="facebook-link" rel="noopener noreferrer">Facebook</a></li>
        <li><a href="https://twitter.com" target="_blank" id="twitter-link" rel="noopener noreferrer">Twitter</a></li>
        <li><a href="https://instagram.com" target="_blank" id="instagram-link" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://linkedin.com" target="_blank" id="linkedin-link" rel="noopener noreferrer">LinkedIn</a></li>
      </ul>
    </div>
  </div>

  <div className="footer-bottom">
    <p>&copy; 2023 LegalShield. All rights reserved.</p>
  </div>
</footer>

      </div>
    </>
  );
}
