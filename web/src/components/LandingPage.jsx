
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSignInAlt, faUserPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/LandingPage.css';
import pic from '../assets/pic.jpg';




const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="landing-page">
       <div className="background-image" />
      <header className="navbar">
        <div className="logo">Freshman Guide</div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
        </div>
        {menuOpen && (
          <div className="dropdown-menu">
            <ul>
              <li onClick={() => navigate('/signup')}>
                <FontAwesomeIcon icon={faUserPlus} /> Sign Up
              </li>
              <li onClick={() => navigate('/login')}>
                <FontAwesomeIcon icon={faSignInAlt} /> Log In
              </li>
              <li onClick={() => navigate('/help')}>
                <FontAwesomeIcon icon={faQuestionCircle} /> Help
              </li>
            </ul>
          </div>
        )}
      </header>

      <div className="content">
        <h1>Welcome to Freshman Guide</h1>
        <button className="get-started-btn" onClick={() => navigate('/login')}>
          Get Started
        </button>
      </div>

      <div className="calendar-of-events">
        <h2>Calendar of Events</h2>
        <hr />
        <div className="event-marquee">
          <div className="event-cards">
            {events.map((event) => (
              <div className="event-card" key={event._id}>
                <h3>{event.eventName}</h3>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <p>{event.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
