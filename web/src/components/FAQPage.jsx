import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FAQPage.css';

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions?limit=5'); // Fetch 5 random FAQs
        if (!response.ok) throw new Error('Failed to fetch FAQs');
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };
    fetchFAQs();
  }, []);

  const toggleExpand = (faqId) => {
    setExpandedFAQ((prev) => (prev === faqId ? null : faqId));
  };

  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq) => (
          <div
            className={`faq-card ${expandedFAQ === faq._id ? 'expanded' : ''}`}
            key={faq._id}
            onClick={() => toggleExpand(faq._id)}
          >
            <i className="fas fa-question-circle"></i>
            <p><strong>Q:</strong> {faq.question}</p>
            {expandedFAQ === faq._id && faq.answer && (
              <p><strong>A:</strong> {faq.answer}</p>
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

export default FAQPage;
