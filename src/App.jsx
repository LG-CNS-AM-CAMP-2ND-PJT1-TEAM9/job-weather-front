import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Login from './pages/Login'
import Resetpw from './pages/Resetpw'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/users/login' element={<Login/>}/>
      <Route path='/users/signup' element={<Signup/>}/>
      <Route path='/users/reset-password' element={<Resetpw/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
