import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth to get logged-in alumni
import '../styles/QuestionsAnswerPage.css';

const QuestionsAnswerPage = () => {
  const { user } = useAuth(); // Get logged-in alumni details
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  // Fetch all questions
  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Submit an answer
  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!selectedQuestion) return;

    try {
      await fetch(`http://localhost:5000/api/questions/${selectedQuestion._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer,
          answeredBy: user.username, // Add the logged-in alumni's username
        }),
      });
      setAnswer('');
      setSelectedQuestion(null);
      fetchQuestions(); // Refresh the questions list
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="questions-answer-page">
      <h1>Answer Questions</h1>
      <div className="questions-list">
        {questions.map((q) => (
          <div
            key={q._id}
            className={`question-card ${selectedQuestion?._id === q._id ? 'selected' : ''}`}
            onClick={() => setSelectedQuestion(q)}
          >
            <p><strong>Q:</strong> {q.question}</p>
            <p><strong>A:</strong> {q.answer || 'No reply yet'}</p>
            {q.answer && (
              <div className="answer-details">
                <p><strong>Answered By:</strong> {q.answeredBy || 'N/A'}</p>
                <p><strong>Answered On:</strong> {q.answeredAt ? new Date(q.answeredAt).toLocaleString() : 'N/A'}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedQuestion && (
        <div className="answer-form">
          <h3>Reply to: {selectedQuestion.question}</h3>
          <form onSubmit={handleAnswerSubmit}>
            <textarea
              placeholder="Write your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <button type="submit">Submit Answer</button>
          </form>
        </div>
      )}

      <button className="back-btn" onClick={() => navigate('/dashboard/alumni')}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default QuestionsAnswerPage;
