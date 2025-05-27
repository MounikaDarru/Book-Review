import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks } from '../store/features/bookSlice';
import BookCard from '../components/BookCard';

const Home = () => {
  const { featuredBooks, status, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  if (status === 'loading') return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading featured books...</p>
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
    <div className="home-page">
      {/* Hero Section without background image */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Next Favorite Book</h1>
          <p className="hero-subtitle">Explore curated collections and read reviews from fellow book lovers</p>
          <a href="#featured" className="btn hero-btn">
            Browse Books
          </a>
        </div>
      </section>

      {/* Featured Books Section */}
      <section id="featured" className="featured-section">
        <div className="section-header">
          <h2>Featured Books</h2>
          <p className="section-subtitle">Handpicked selections from our collection</p>
        </div>
        
        {featuredBooks.length > 0 ? (
          <div className="book-grid">
            {featuredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No featured books available at the moment.</p>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h3>Ready to explore more?</h3>
          <p>Browse our complete collection of books</p>
          <a href="/books" className="btn cta-btn">
            View All Books
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;