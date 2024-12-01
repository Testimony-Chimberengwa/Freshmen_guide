import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth for user context
import '../styles/QuestionsPage.css';

const QuestionsPage = () => {
  const { user } = useAuth(); // Access logged-in user
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ question: '' });
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/questions?author=${user.username}`);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: form.question, author: user.username }),
      });
      fetchQuestions();
      setForm({ question: '' }); // Clear the form
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const handleDelete = async (questionId) => {
    try {
      await fetch(`http://localhost:5000/api/questions/${questionId}`, {
        method: 'DELETE',
      });
      fetchQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const toggleExpand = (questionId) => {
    setExpandedQuestion((prev) => (prev === questionId ? null : questionId));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="questions-page">
      <h1>Ask a Question</h1>
      <form onSubmit={handleSubmit} className="question-form">
        <textarea
          placeholder="Write your question here..."
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div className="questions-list">
        {questions.map((q) => (
          <div
            className={`question-card ${expandedQuestion === q._id ? 'expanded' : ''}`}
            key={q._id}
            onClick={() => toggleExpand(q._id)}
          >
            <p>{q.question}</p>
            {expandedQuestion === q._id && (
              <div className="expanded-content">
                <p><strong>Author:</strong> {q.author}</p>
                <p><strong>Date:</strong> {new Date(q.createdAt).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(q.createdAt).toLocaleTimeString()}</p>
                <p><strong>Answer:</strong> {q.answer || 'No reply yet'}</p>
                {q.answer && (
                  <p><strong>Answered By:</strong> {q.answeredBy}</p>
                )}
                {q.answer && (
                  <p><strong>Replied On:</strong> {new Date(q.answeredAt).toLocaleString()}</p>
                )}
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(q._id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate('/dashboard/freshman')}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default QuestionsPage;
