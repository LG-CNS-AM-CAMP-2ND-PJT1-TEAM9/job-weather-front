import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Login from './pages/Login'
import JobSearch from './pages/job_search/job_search.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/users/login' element={<Login/>}/>
      <Route path='/users/signup' element={<Signup/>}/>

      <Route path='/job_search' element={<JobSearch/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
