import React from 'react';
import { Link } from 'react-router-dom';
import { user } from './user.data';
 
class Navbar extends React.Component {
    constructor(props){
        super(props);
    this.state = {
        user : user
    };
    }
    

render() {
  return (
    <nav>
    <div className="logo">
      <Link to="/">Haye Places</Link>
    </div>
    <ul>
      <li><Link to="/explore">Explore</Link></li>
      <li><Link to="/events">Events</Link></li>
      <li><Link to="/places">Places</Link></li>
      <li><Link to="/signin">{user ? 'Sign Out' : 'Sign In'}</Link></li>*
    </ul>
  </nav>
  );
}
}
export default Navbar;






