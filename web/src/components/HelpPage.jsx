import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/HelpPage.css';

const HelpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="help-page">
      <header className="help-header">
        <div onClick={() => navigate('/')} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </div>
      </header>

      <div className="help-content">
        <h1>Help</h1>
        <p>
          <strong>Freshman:</strong> Create an account if you don't have one. Once registered, you can log in using
          your credentials.
        </p>
        <p>
          <strong>Alumni:</strong> Use the credentials provided to you to log in. Make sure to check the box labeled
          "Alumni" on the login form.
        </p>
        <button className="exit-btn" onClick={() => navigate('/')}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default HelpPage;
