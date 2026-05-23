import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"
const Navbar = () => {
    const { logout } = useAuth();
    return (
        <>
            <nav>
                <h2 className="nav-logo">
                    ResumeAnalyzer
                </h2>

                <div className="links">
                    <Link to="/dashboard" className="nav-links" >Dashborad</Link>
                    <Link to="/login" className="nav-links">Login</Link>
                    <Link to="/signup" className="nav-links" >Signup</Link>
                    <button onClick={logout} className="nav-button" >Logout</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar