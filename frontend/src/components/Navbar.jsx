import { Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"
import "../styles/Navbar.css";

const Navbar = () => {
    const { logout, token } = useAuth();
    return (
        <>
            <nav>
                <h2 className="nav-logo">
                    ResumeAnalyzer
                </h2>

                <div className="links">
                    {
                        token ? <>
                        <Link to="/dashboard" className="nav-links" >Dashboard</Link>
                        <Link to="/upload" className="nav-links" >Upload</Link>
                        <Link to="/analysis/history" className="nav-links" >History</Link>
                        <button onClick={logout} className="nav-button" >Logout</button>

                        </> : <>
                        <Link to="/" className="nav-links" >Home</Link> 
                        <Link to="/features" className="nav-links" >Features</Link> 
                        <Link to="/signup" className="nav-links" >Register</Link> 
                        <Link to="/login" className="nav-links">Login</Link>
                        </>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar