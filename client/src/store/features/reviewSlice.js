import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

export const getReviews = createAsyncThunk(
  'reviews/getReviews',
  async (bookId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/reviews?bookId=${bookId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch reviews');
    }
  }
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      // Validate required fields
      if (!reviewData.book || !reviewData.rating || !reviewData.comment) {
        throw new Error('Missing required review fields');
      }
      
      const response = await API.post('/reviews', {
        book: reviewData.book,
        rating: Number(reviewData.rating),
        comment: reviewData.comment
      });
      
      // Return the review data with safe user fallback
      return {
        ...response.data,
        user: response.data.user || { name: 'Anonymous' } // Fixed: Use response data
      };
      
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 
        err.message || 
        'Failed to submit review'
      );
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(createReview.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch reviews';
      });
  },
});

export default reviewSlice.reducer;
