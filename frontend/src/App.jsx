import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import Explore from './pages/Explore.page';
import Events from './pages/Events.page';
import Places from './pages/Places.page';
import SignInAndSignUpPage from './pages/SignInAndSignUp.page';
// import PlaceDetails from './pages/PlaceDetails';
import Header from './services/Header';

function App() {
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState([]);
  const [events, setEvents] = useState([]);
  // const [favorites, setFavorites] = useState([]);

  return (
    <Router>
      <Header user={user} />
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route exact path="/explore" element={<Explore places={places} setPlaces={setPlaces} />} />
        <Route path="/events" element={<Events events={events} setEvents={setEvents} />} />
        <Route path="/places" element={<Places places={places} setPlaces={setPlaces} />} />
        <Route path="/signin" element={<SignInAndSignUpPage user = {user} setUser = {setUser}/>} />
        {/* <Route path="/place/:id" element={<PlaceDetails places={places} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
