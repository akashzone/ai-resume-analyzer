import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ResumeUpload from './pages/ResumeUpload.jsx';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AnalysisPage from "./pages/AnalysisPage.jsx";

import './App.css'


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        <Route path="/upload"
          element={
            <ProtectedRoute>
              <ResumeUpload />
            </ProtectedRoute>
          } />

          <Route path="/analysis/:resumeId"
          element={
            <ProtectedRoute>
              <AnalysisPage/>
            </ProtectedRoute>
          } />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App;
