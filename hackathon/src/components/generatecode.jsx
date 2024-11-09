import React, { useState } from 'react';
import '../styles/generatecode.css'; // Import the custom CSS file
import Navbar from './navbar';
import { BackgroundBeams } from './ui/backgroundBeams';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const CodeGenerationPage = () => {
  const [code, setCode] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [roomJoined, setRoomJoined] = useState(false);
  const navigate = useNavigate();

  const generateCode = async () => {
    // Generate a random code
    try{
      console.log("Generating code");
      const response = await axios.post('http://localhost:8001/createRoom',{withCredentials: true});
  
      const res = response.data;
  
      if(res.status === 200){
        setCode(res.code);
      }
      else{
        toast.error(res.error || 'Failed to generate room');
      }
  
      setRoomCreated(true);
      setRoomJoined(false); // Reset join room state when generating new room
    }
    catch(error){
      console.log(error);
      toast.error(error);
    }
  };

  const joinRoom = async () => {
    try{
      const response = await axios.post('http://localhost:8001/joinRoom',{withCredentials: true});
  
      const res = response.data;
  
      if(res.status === 200 && joinCode === code ){
        navigate(`${res.redirect}`);
        setRoomJoined(true);
      }
      else{
        toast.error(res.error || 'Failed to join room');
      } 
    }
    catch(error){
      console.log(error);
      toast.error(error);
    }
  };

  return (
  
    <div className="page-container">
      <ToastContainer />
      <BackgroundBeams />
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
              className="join-input text-black"
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