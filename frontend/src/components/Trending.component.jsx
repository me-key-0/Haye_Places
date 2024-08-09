import React from 'react';
import places from '../services/places.data'
 
class TrendingPlaces extends React.Component {
    constructor(props){
        super(props);
    this.state = {
        places : places
    };
    }
    

render() {
  return (
    <div>
      <h3>Trending Places</h3>
      {places.filter(place => place.isTrending).map(place => (
        <div key={place.id}>{place.name}</div>
      ))}
    </div>
  );
}
}
export default TrendingPlaces;






