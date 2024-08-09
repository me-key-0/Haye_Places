import Explore from '../components/Explore.component';
import BestDeals from "../components/BestDeals.component";
import TrendingPlaces from "../components/Upcoming.component";
import TopRated from "../components/TopRated.component";
import SearchBar from '../components/SearchBar.component';
const ExplorePage = () => {
      return(
        <div>
        <Explore />
        <SearchBar/>
        <BestDeals />
        <TrendingPlaces />
        <TopRated />
        </div>
      )
}

export default ExplorePage;
