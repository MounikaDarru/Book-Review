import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks } from '../store/features/bookSlice';
import BookCard from '../components/BookCard';
import Search from '../components/Search';
import { Link } from 'react-router-dom';

const BookList = () => {
  const { books, status, error } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  if (status === 'loading') return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading books...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <p>Error loading books: {error}</p>
      <button onClick={() => dispatch(getBooks())} className="btn retry-btn">
        Try Again
      </button>
    </div>
  );

  return (
    <div className="book-list-page">
      <div className="page-header">
        <h1>All Books</h1>
        <p className="page-subtitle">Browse our complete collection</p>
      </div>

      <div className="action-bar">
        <Search />
        {user?.isAdmin && (
          <Link to="/admin/add-book" className="btn add-book-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add New Book
          </Link>
        )}
      </div>

      {books.length > 0 ? (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No books found in our collection.</p>
          {user?.isAdmin && (
            <Link to="/admin/add-book" className="btn">
              Add Your First Book
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default BookList;