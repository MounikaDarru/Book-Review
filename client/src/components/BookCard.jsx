import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <Link to={`/books/${book._id}`}>
        <img src={book.image || '/default-book.jpg'} alt={book.title} />
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <Rating value={book.rating} />
      </Link>
    </div>
  );
};

export default BookCard;