import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

export const getBooks = createAsyncThunk('books/getBooks', async () => {
  const response = await API.get('/books');
  return response.data;
});

export const getBookById = createAsyncThunk('books/getBookById', async (id) => {
  const response = await API.get(`/books/${id}`);
  return response.data;
});

export const searchBooksByQuery = createAsyncThunk(
  'books/search',
  async (query, { rejectWithValue }) => {
    try {
      const res = await API.get(`/books/search?q=${query}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Search failed');
    }
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    featuredBooks: [],
    currentBook: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
        state.featuredBooks = action.payload.slice(0, 4);
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getBookById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentBook = action.payload;
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchBooksByQuery.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchBooksByQuery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(searchBooksByQuery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Search failed';
      });
  },
});

export default bookSlice.reducer;