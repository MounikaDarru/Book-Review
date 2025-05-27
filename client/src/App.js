import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import Home from './pages/Home';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import Profile from './pages/Profile';
import ReviewForm from './pages/ReviewForm';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBook from './pages/AddBook';
import './App.css';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:id/edit" element={<EditProfile />} />
              <Route path="/review/:bookId" element={<ReviewForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/add-book" element={<AddBook />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;