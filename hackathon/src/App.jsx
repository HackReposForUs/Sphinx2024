import { useState } from 'react'
import HomePage from './components/HomePage'
import CodeGenerationPage from './components/generatecode'
import Basic from './components/basic'
import ChatDashboard from './components/Dashboard'
// import MetaMaskLogin from './components/MetaMaskLogin'
import AuthPage from './components/Login'
import AdminChat from './components/adminChat'
import UserChat from './components/userChat'
import StartNewChat from './components/StartNewChat'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
       <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generateRoom" element={<CodeGenerationPage />} />
          <Route path="/joinRoom" element={<Basic />} />
          <Route path="/dashboard" element={<ChatDashboard />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/adminChat" element={<AdminChat />} />
          <Route path="/userChat" element={<UserChat />} />
          <Route path="/startNewChat" element={<StartNewChat />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
