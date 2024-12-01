import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', username: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return 'weak';
    if (/[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password)) return 'strong';
    if (/\d/.test(password) || /[!@#$%^&*]/.test(password)) return 'medium';
    return 'weak';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessageType('error');
      setMessage('Passwords do not match!');
      return;
    }
    if (passwordStrength === 'weak') {
      setMessageType('error');
      setMessage('Password strength is too weak. Try making it stronger.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMessageType('success');
        setMessage('Account created successfully!');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessageType('error');
        setMessage('Failed to create account. Please try again.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {message && <div className={`message ${messageType}`}>{message}</div>}
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="username" placeholder="Username" onChange={handleChange} required />
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
        <div className="password-strength">
          <span className={`strength-bar ${passwordStrength}`}></span>
          <span className={`strength-bar ${passwordStrength}`}></span>
          <span className={`strength-bar ${passwordStrength}`}></span>
        </div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
        </p>
      </form>
      <button className="back-btn" onClick={() => navigate('/')}>
        HOME
      </button>
    </div>
  );
};

export default SignUpPage;
