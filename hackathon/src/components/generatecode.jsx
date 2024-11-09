import React, { useState } from 'react';
import './App.css'; // Import the custom CSS file
import Navbar from './components/navbar';

const CodeGenerationPage = () => {
  const [code, setCode] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [roomJoined, setRoomJoined] = useState(false);

  const generateCode = () => {
    // Generate a random code
    const newCode = Math.random().toString(36).substr(2, 8).toUpperCase();
    setCode(newCode);
    setRoomCreated(true);
    setRoomJoined(false); // Reset join room state when generating new room
  };

  const joinRoom = () => {
    if (joinCode === code) {
      // If the join code matches the generated code, allow joining the room
      setRoomJoined(true);
    } else {
      // Optionally, you can show an error if the code doesn't match
      alert("Invalid code! Please try again.");
    }
  };

  return (
  
    <div className="page-container">
   <Navbar/>
   <div className="page-container1">
      <div className="content-box">
        <h1>Generate Code & Join Room</h1>

        {!roomCreated ? (
          <button onClick={generateCode} className="generate-btn">
            Generate Code
          </button>
        ) : (
          <div className="code-display">
            <p>Code: {code}</p>
            <p>Room has been created.</p>
          </div>
        )}

        {/* Join Room Section */}
        {roomCreated && !roomJoined && (
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
        )}

        {roomJoined && (
          <div className="success-message">
            <p>Successfully joined room with code: {joinCode}</p>
          </div>
        )}
      </div>
    </div>
    </div>

  );
};

export default CodeGenerationPage;