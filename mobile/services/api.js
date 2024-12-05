import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a token to requests if authentication is needed
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (data) => API.post('/login', data);
export const signup = (data) => API.post('/signup', data);
export const fetchMentorships = () => API.get('/mentorships');
export const fetchQuestions = () => API.get('/questions');
export const postQuestion = (data) => API.post('/questions', data);
export const fetchFAQs = () => API.get('/questions?limit=5');
export const fetchEvents = () => API.get('/events');
