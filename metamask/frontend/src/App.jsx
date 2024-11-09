import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MetaMaskLogin from './MetaMaskLogin'
import Login from './Login'
import Dashboard from "./components/Dashboard"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <MetaMaskLogin  /> */}
      {/* <Login /> */}
      <Dashboard />
    </>
  )
}

export default App
