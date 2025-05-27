import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AddBook = () => {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    title: "", 
    author: "", 
    description: "",
    genre: "",
    publishedDate: "",
    pageCount: "",
    image: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await api.post("/books", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/books", { state: { success: "Book added successfully!" } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book. Admin access only.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  if (!user?.isAdmin) {
    return (
      <div className="unauthorized-container">
        <div className="unauthorized-card">
          <div className="unauthorized-icon">⛔</div>
          <h2>Access Denied</h2>
          <p>You are not authorized to add books.</p>
          <button 
            onClick={() => navigate("/books")} 
            className="btn return-btn"
          >
            Return to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-book-page">
      <div className="form-container">
        <div className="form-header">
          <h2>Add a New Book</h2>
          <p>Fill in the details to add a new book to the collection</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label htmlFor="title">Book Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter book title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author *</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Enter author name"
              value={form.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Cover Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              placeholder="https://example.com/book-cover.jpg"
              value={form.image}
              onChange={handleChange}
            />
            {form.image && (
              <div className="image-preview">
                <img src={form.image} alt="Book cover preview" onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter book description"
              value={form.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate("/books")} 
              className="btn cancel-btn"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Adding...
                </>
              ) : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;