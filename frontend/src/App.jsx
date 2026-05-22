import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import './App.css'


function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}  />
      <Route path="/dashboard" element={<Dashboard/>}  />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
    </>
  )
}

export default App;
