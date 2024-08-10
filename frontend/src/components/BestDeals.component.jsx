import React from 'react';
import places from '../services/places.data';

class BestDeals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: places
    };
  }

  render() {
    return (
      <div>
        <h3 className="text-xl font-bold mb-4">Best Deals</h3>
        {this.state.places.filter(place => place.isNearby).map(place => (
          <div key={place.id} className="mb-2">
            <h4 className="text-lg font-semibold">{place.name}</h4>
            <p>{place.description}</p>
            <ul className="list-disc pl-5">
              {place.bestDeals.map((deal, index) => (
                <li key={index}>
                  {deal.deal} {deal.percentageOff && `- ${deal.percentageOff}% off`}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default BestDeals;
