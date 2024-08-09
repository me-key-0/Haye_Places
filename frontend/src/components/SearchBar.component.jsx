import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [nearby, setNearby] = useState('');

  const handleSearch = () => {
    onSearch({ query, price, rating, nearby });
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search..." 
      />
      <select value={price} onChange={(e) => setPrice(e.target.value)}>
        <option value="">Price</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="">Rating</option>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>
      <input 
        type="text" 
        value={nearby} 
        onChange={(e) => setNearby(e.target.value)} 
        placeholder="Nearby location" 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

// Prop validation
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // Ensure `onSearch` is a required function
};

export default SearchBar;
