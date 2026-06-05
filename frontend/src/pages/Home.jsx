import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>
          Improve your resume with AI-powered ATS feedback
        </h1>

        <p>
          Upload your resume, get an ATS score, identify missing
          skills, strengths, weaknesses, and generate interview
          questions.
        </p>

        <div className="hero-buttons">

          <Link to="/signup">
            <button className="primary-btn">
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button className="secondary-btn">
              Login
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Home;