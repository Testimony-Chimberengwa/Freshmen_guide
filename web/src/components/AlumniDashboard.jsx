import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import '../styles/AlumniDashboard.css';

const AlumniDashboard = () => {
  const { user } = useAuth(); // Access user from context
  const navigate = useNavigate();

  useEffect(() => {
    const typed = new Typed('.typewriter', {
      strings: [`Welcome, ${user?.username || 'Guest'}`],
      typeSpeed: 50,
    });
    return () => typed.destroy();
  }, [user]);

  return (
    <div className="dashboard">
      <div className="typewriter"></div>
      <div className="cards-container">
        <div className="card" onClick={() => navigate('/mentorship')}>
          <i className="fas fa-user-graduate"></i>
          <h2>Mentorship</h2>
        </div>
        <div className="card" onClick={() => navigate('/questions-answer')}>
          <i className="fas fa-question-circle"></i>
          <h2>Questions</h2>
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

export default AlumniDashboard;
