import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ username: '', password: '', isAlumni: false });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch('http://localhost:5000/api/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(form),
  //   });
  //   const data = await response.json();

  //   if (response.ok) {
  //     setUser({ username: data.username });
  //     setMessageType('success');
  //     setMessage('Login successful!');
  //     const redirectPath = form.isAlumni ? '/dashboard/alumni' : '/dashboard/freshman';
  //     setTimeout(() => navigate(redirectPath), 2000);
  //   } else {
  //     setMessageType('error');
  //     setMessage('Wrong username or password.');
  //     setShake(true);
  //     setTimeout(() => setShake(false), 500); // Remove the shake effect after animation
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        const data = await response.json();
        if (response.ok) {
            setUser({ username: data.username });
            setMessageType('success');
            setMessage('Login successful!');
            const redirectPath = form.isAlumni ? '/dashboard/alumni' : '/dashboard/freshman';
            setTimeout(() => navigate(redirectPath), 2000);
        } else {
            setMessageType('error');
            setMessage(data.error || 'Login failed. Please try again.');
            setShake(true);
            setTimeout(() => setShake(false), 500); // Reset shake animation
        }
    } catch (error) {
        setMessageType('error');
        setMessage('An error occurred. Please try again later.');
        setShake(true);
        setTimeout(() => setShake(false), 500);
    }
};


  return (
    <div className="login-page">
      <form
        onSubmit={handleSubmit}
        className={shake ? 'shake' : ''} // Add shake class if necessary
      >
        <h1>Log In</h1>
        {message && <div className={`message ${messageType}`}>{message}</div>}
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        <div className="check">
          <label>
            <input
              type="checkbox"
              name="isAlumni"
              onChange={handleChange}
            />
            Alumni
          </label>
        </div>
        <button type="submit">Log In</button>
        <p>
          Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span>
        </p>
      </form>
      <button className="back-btn" onClick={() => navigate('/')}>
        HOME
      </button>
    </div>
  );
};

export default LoginPage;
