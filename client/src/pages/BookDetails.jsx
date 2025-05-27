// import React, { useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { getBookById } from '../store/features/bookSlice';
// import { getReviews } from '../store/features/reviewSlice';
// import Rating from '../components/Rating';
// import DefaultBookImage from '../assets/default-book.jpg';

// const BookDetails = () => {
//   const { id } = useParams();
//   const { currentBook, status: bookStatus, error: bookError } = useSelector((state) => state.books);
//   const { reviews, status: reviewStatus, error: reviewError } = useSelector((state) => state.reviews);
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getBookById(id));
//     dispatch(getReviews(id));
//   }, [id, dispatch]);

//   if (bookStatus === 'loading') return (
//     <div className="loading-container">
//       <div className="loading-spinner"></div>
//       <p>Loading book details...</p>
//     </div>
//   );
  
//   if (bookError) return (
//     <div className="error-container">
//       <p>Error loading book: {bookError}</p>
//       <button onClick={() => dispatch(getBookById(id))} className="btn retry-btn">
//         Try Again
//       </button>
//     </div>
//   );
  
//   if (!currentBook) return (
//     <div className="not-found">
//       <h2>Book not found</h2>
//       <Link to="/books" className="btn">
//         Browse All Books
//       </Link>
//     </div>
//   );

//   return (
//     <div className="book-details-page">
//       <div className="breadcrumb">
//         <Link to="/">Home</Link> &gt; <Link to="/books">Books</Link> &gt; {currentBook.title}
//       </div>

//       <div className="book-info-container">
        
//         <div className="book-meta">
//           <h1 className="book-title">{currentBook.title}</h1>
//           <p className="book-author">by {currentBook.author}</p>
          
//           <div className="rating-container">
//             <Rating value={currentBook.rating || 0} />
//             <span className="rating-text">
//               {currentBook.rating?.toFixed(1) || 'No'} rating ({reviews.length} reviews)
//             </span>
//           </div>

//           <div className="book-details">
//             <div className="detail-item">
//               <span className="detail-label">Published:</span>
//               <span className="detail-value">
//                 {currentBook.publishedDate ? new Date(currentBook.publishedDate).toLocaleDateString() : 'Unknown'}
//               </span>
//             </div>
//             <div className="detail-item">
//               <span className="detail-label">Genre:</span>
//               <span className="detail-value">
//                 {currentBook.genre || 'Not specified'}
//               </span>
//             </div>
//             <div className="detail-item">
//               <span className="detail-label">Pages:</span>
//               <span className="detail-value">
//                 {currentBook.pageCount || 'Unknown'}
//               </span>
//             </div>
//           </div>

//           <div className="book-description">
//             <h3>About This Book</h3>
//             <p>{currentBook.description || 'No description available.'}</p>
//           </div>

//           {user && (
//             <Link to={`/review/${id}`} className="btn review-btn">
//               Write a Review
//             </Link>
//           )}
//         </div>
//       </div>

//       <div className="reviews-section">
//         <div className="section-header">
//           <h2>Reader Reviews</h2>
//           <p className="section-subtitle">
//             {reviews.length > 0 ? 
//               `What readers are saying about "${currentBook.title}"` : 
//               `No reviews yet for "${currentBook.title}"`}
//           </p>
//         </div>

//         {reviewStatus === 'loading' ? (
//           <div className="loading-container">
//             <div className="loading-spinner small"></div>
//             <p>Loading reviews...</p>
//           </div>
//         ) : reviewError ? (
//           <div className="error-container small">
//             <p>Error loading reviews: {reviewError}</p>
//             <button onClick={() => dispatch(getReviews(id))} className="btn retry-btn">
//               Try Again
//             </button>
//           </div>
//         ) : reviews.length === 0 ? (
//           <div className="empty-reviews">
//             <p>Be the first to review this book!</p>
//             {user && (
//               <Link to={`/review/${id}`} className="btn">
//                 Write the First Review
//               </Link>
//             )}
//           </div>
//         ) : (
//           <div className="reviews-grid">
//             {reviews.map((review) => (
//               <div key={review._id || Math.random()} className="review-card">
//                 <div className="review-header">
//                   <div className="reviewer-info">
//                     <h3 className="reviewer-name">
//                       {review.user?.name || 'Anonymous Reviewer'}
//                     </h3>
//                     <Rating value={review.rating || 0} readOnly />
//                   </div>
//                   <span className="review-date">
//                     {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Unknown date'}
//                   </span>
//                 </div>
//                 <div className="review-content">
//                   <h4 className="review-title">{review.title || 'Untitled Review'}</h4>
//                   <p className="review-comment">
//                     {review.comment || 'No comment provided'}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookDetails;


import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBookById } from '../store/features/bookSlice';
import { getReviews } from '../store/features/reviewSlice';
import Rating from '../components/Rating';

const BookDetails = () => {
  const { id } = useParams();
  const { currentBook, status: bookStatus, error: bookError } = useSelector((state) => state.books);
  const { reviews, status: reviewStatus, error: reviewError } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookById(id));
    dispatch(getReviews(id));
  }, [id, dispatch]);

  if (bookStatus === 'loading') return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading book details...</p>
    </div>
  );
  
  if (bookError) return (
    <div className="error-container">
      <p>Error loading book: {bookError}</p>
      <button onClick={() => dispatch(getBookById(id))} className="btn retry-btn">
        Try Again
      </button>
    </div>
  );
  
  if (!currentBook) return (
    <div className="not-found">
      <h2>Book not found</h2>
      <Link to="/books" className="btn">
        Browse All Books
      </Link>
    </div>
  );

  // Handle missing book image
  const getBookImage = () => {
    if (currentBook.image) {
      return currentBook.image;
    }
    // Fallback to a placeholder image URL or data URI
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cccccc'%3E%3Cpath d='M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 18H6V4h2v8l2.5-1.5L13 12V4h5v16z'/%3E%3C/svg%3E";
  };

  return (
    <div className="book-details-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <Link to="/books">Books</Link> &gt; {currentBook.title}
      </div>

      <div className="book-info-container">
        <div className="book-cover">
          <img 
            src={getBookImage()} 
            alt={currentBook.title}
            className="book-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cccccc'%3E%3Cpath d='M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 18H6V4h2v8l2.5-1.5L13 12V4h5v16z'/%3E%3C/svg%3E";
            }}
          />
        </div>

        <div className="book-meta">
          <h1 className="book-title">{currentBook.title}</h1>
          <p className="book-author">by {currentBook.author}</p>
          
          <div className="book-description">
            <h3>About This Book</h3>
            <p>{currentBook.description || 'No description available.'}</p>
          </div>

          {user && (
            <Link to={`/review/${id}`} className="btn review-btn">
              Write a Review
            </Link>
          )}
        </div>
      </div>

      <div className="reviews-section">
        <div className="section-header">
          <h2>Reader Reviews</h2>
          <p className="section-subtitle">
            {reviews.length > 0 ? 
              `What readers are saying about "${currentBook.title}"` : 
              `No reviews yet for "${currentBook.title}"`}
          </p>
        </div>

        {reviewStatus === 'loading' ? (
          <div className="loading-container">
            <div className="loading-spinner small"></div>
            <p>Loading reviews...</p>
          </div>
        ) : reviewError ? (
          <div className="error-container small">
            <p>Error loading reviews: {reviewError}</p>
            <button onClick={() => dispatch(getReviews(id))} className="btn retry-btn">
              Try Again
            </button>
          </div>
        ) : reviews.length === 0 ? (
          <div className="empty-reviews">
            <p>Be the first to review this book!</p>
            {user && (
              <Link to={`/review/${id}`} className="btn">
                Write the First Review
              </Link>
            )}
          </div>
        ) : (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review._id || Math.random()} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <h3 className="reviewer-name">
                      {review.user?.name || 'Anonymous Reviewer'}
                    </h3>
                    <Rating value={review.rating || 0} readOnly />
                  </div>
                  <span className="review-date">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Unknown date'}
                  </span>
                </div>
                <div className="review-content">
                  <p className="review-comment">
                    {review.comment || 'No comment provided'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
  );
};

export default BookDetails;