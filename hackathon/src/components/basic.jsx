
import React, { useState } from 'react';
import '../styles/basic.css'; // Import the custom CSS file
import Navbar from './navbar';
import { BackgroundBeams } from './ui/backgroundBeams';

const Basic = () => {
  const [joinCode, setJoinCode] = useState('');

  const joinRoom = () => {
    // Add any functionality needed upon submitting the join code
    alert(`Attempting to join room with code: ${joinCode}`);
  };

  return (
    <div className="page-container">
      <BackgroundBeams />
      <Navbar/>
      <div className="page-container1">
        <div className="content-box">
          <h1>Enter Code to Join Room</h1>
          <div className="join-room">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="join-input"
              placeholder="Enter code to join room"
            />
            <button onClick={joinRoom} className="join-btn">
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basic;
