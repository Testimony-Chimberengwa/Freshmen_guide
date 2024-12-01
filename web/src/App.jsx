import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

import LandingPage from './components/LandingPage';
import HelpPage from './components/HelpPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import FreshmanDashboard from './components/FreshmanDashboard';
import AlumniDashboard from './components/AlumniDashboard';
import MentorshipPage from './components/MentorshipPage';
import MentorshipAdvice from './components/MentorshipAdvice';
import QuestionsPage from './components/QuestionsPage';
import FAQPage from './components/FAQPage';
import QuestionsAnswerPage from './components/QuestionsAnswerPage';

const App = () => (
  <AuthProvider> {/* Wrap the app in AuthProvider */}
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/freshman" element={<FreshmanDashboard />} />
        <Route path="/dashboard/alumni" element={<AlumniDashboard />} />
        <Route path="/mentorship" element={<MentorshipPage />} />
        <Route path="/mentorship-advice" element={<MentorshipAdvice />} />
        <Route path="/questions-answer" element={<QuestionsAnswerPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/faqs" element={<FAQPage />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
