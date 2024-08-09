import { useState } from 'react';
import SearchBar from '../components/SearchBar.component';
import eventsData from './events.data';
import placesData from './places.data';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);

  const filterData = (data, { query, price, rating, nearby }) => {
    return data.filter(item => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
      const matchesPrice = price ? item.price === price : true;
      const matchesRating = rating ? item.rating === parseInt(rating) : true;
      const matchesNearby = nearby ? item.location.includes(nearby) : true;
      return matchesQuery && matchesPrice && matchesRating && matchesNearby;
    });
  };

  const handleSearch = ({ query, price, rating, nearby }) => {
    const filteredEvents = filterData(eventsData, { query, price, rating, nearby });
    const filteredPlaces = filterData(placesData, { query, price, rating, nearby });
    setSearchResults([...filteredEvents, ...filteredPlaces]);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div>
        {searchResults.map(result => (
          <div key={result.id}>
            <h4>{result.name}</h4>
            <p>{result.description}</p>
            <p>Price: {result.price}</p>
            <p>Rating: {result.rating}</p>
            <p>Location: {result.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
