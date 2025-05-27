import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../store/features/reviewSlice';
import Rating from '../components/Rating';

const ReviewForm = () => {
  const { bookId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useSelector((state) => state.auth);
  const { status, error } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    if (comment.length < 10) {
      alert('Review must be at least 10 characters');
      return;
    }

    try {
      const result = await dispatch(createReview({
        book: bookId,
        rating,
        comment,
        user: user.id // Make sure to include user ID
      }));
      
      if (result.error) throw new Error(result.error);
      
      navigate(`/books/${bookId}`, { 
        state: { reviewSuccess: true } 
      });
    } catch (err) {
      console.error('Review submission failed:', err.message);
    }
  };

  return (
    <div className="review-form">
      <h2>Write a Review</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating (required)</label>
          <Rating
            value={rating}
            onClick={(value) => setRating(value)}
            editable={true}
          />
        </div>
        <div className="form-group">
          <label>Review (minimum 10 characters)</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            minLength="10"
            placeholder="Share your thoughts about this book..."
          />
        </div>
        <button 
          type="submit" 
          className="btn submit-btn"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
