import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MetaMaskLogin from './MetaMaskLogin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MetaMaskLogin  />
    </>
  )
}

export default App
