import React from 'react';
import places from '../services/places.data'
 
class TopRated extends React.Component {
    constructor(props){
        super(props);
    this.state = {
        places : places
    };
    }
    

render() {
  return (
    <div>
    <h3>Top Rated Places</h3>
    {places.filter(place => place.isTopRated).map(place => (
      <div key={place.id}>{place.name}</div>
    ))}
  </div>
  );
}
}
export default TopRated;



