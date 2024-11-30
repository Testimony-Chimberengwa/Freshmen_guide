import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
import { useAuth } from '../context/AuthContext'; // Import useAuth for user context
import '../styles/FreshmanDashboard.css'; // Assuming a CSS file for styling

const FreshmanDashboard = () => {
  const { user } = useAuth(); // Access user from context
  const navigate = useNavigate();

  useEffect(() => {
    const typed = new Typed('.typewriter', {
      strings: [`Welcome, ${user?.username || 'Guest'}`], // Dynamically greet the user
      typeSpeed: 50,
    });
    return () => typed.destroy(); // Cleanup on component unmount
  }, [user]);

  return (
    <div className="dashboard">
      <div className="typewriter"></div> {/* Animated welcome message */}
      <div className="cards-container">
        <div className="card" onClick={() => navigate('/mentorship-advice')}>
          <i className="fas fa-chalkboard-teacher"></i>
          <h2>Mentorship Advice</h2>
        </div>
        <div className="card" onClick={() => navigate('/questions')}>
          <i className="fas fa-question-circle"></i>
          <h2>Questions</h2>
        </div>
        <div className="card" onClick={() => navigate('/faqs')}>
          <i className="fas fa-info-circle"></i>
          <h2>FAQs</h2>
        </div>
      </div>
      <button
  className="logout-btn"
  onClick={() => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  }}
>
  Logout
</button>

    </div>
  );
};

export default FreshmanDashboard;
