
import React, { useState } from 'react';
import '../styles/basic.css'; // Import the custom CSS file
import Navbar from './navbar';
import { BackgroundBeams } from './ui/backgroundBeams';
import { useNavigate } from 'react-router-dom';

const Basic = () => {
  const [joinCode, setJoinCode] = useState('');
  const navigate = useNavigate();

  const joinRoom = () => {
    // Add any functionality needed upon submitting the join code
    alert(`Attempting to join room with code: ${joinCode}`);
    navigate('/userChat');
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
              className="join-input text-black"
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
