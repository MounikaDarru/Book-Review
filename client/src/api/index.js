import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000/api' 
    : '/api', // For production
});

// Request interceptor for adding auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchBooks = () => API.get('/books');
export const fetchBookById = (id) => API.get(`/books/${id}`);
export const searchBooks = (query) => API.get(`/books/search?q=${query}`);
export const fetchReviews = (bookId) => API.get(`/reviews?book=${bookId}`);
export const submitReview = (review) => API.post('/reviews', review);
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (userData) => API.post('/auth/register', userData);
export const fetchUserProfile = () => API.get('/users/profile');

export default API;