import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchBooksByQuery } from '../store/features/bookSlice';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchBooksByQuery(query)); // ✅ should be firing
    }
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
