import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-white font-sans">
<<<<<<< HEAD:src/pages/HomePage.jsx
      
=======
      {/* Header with Logo and Sign-In Button */}
      <header className="bg-[#FCF8F1] shadow-md fixed top-0 left-0 w-full z-50 flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
        <Link to="/">
          <img
            src="C:\Users\No One\Documents\Internship\playground\frontend\src\assets\Haye_light.png"
            alt="Logo"
            className="w-auto h-8"
          />
        </Link>
        <nav className="flex justify-center gap-8">
          <a
            href="#explore"
            className="text-base text-black transition-all duration-200 hover:text-opacity-80"
          >
            Explore
          </a>
          <a
            href="#events"
            className="text-base text-black transition-all duration-200 hover:text-opacity-80"
          >
            Events
          </a>
          <a
            href="#places"
            className="text-base text-black transition-all duration-200 hover:text-opacity-80"
          >
            Places
          </a>
          <a
            href="#about"
            className="text-base text-black transition-all duration-200 hover:text-opacity-80"
          >
            About
          </a>
        </nav>
        <Link
          to="/signin"
          className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
        >
          Sign In
        </Link>
      </header>
>>>>>>> aca4a436650851a8888c514d9c01a03121609228:frontend/src/pages/HomePage.jsx

{/* Main Content */}
      <div className="pt-20 mt-16">
        <section id="explore" className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-4">Explore</h2>
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 mb-4">
              <div>
                <img
                  src="path/to/explore-preview.jpg"
                  alt="Explore"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                  Best Sellers, Top Rated, Trending Places
                </p>
                <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                  Explore Amazing Places
                </h1>
                <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                  Discover the best spots in town.
                </p>
                <Link
                  to="/explore"
                  className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
                >
                  See More
                  <svg
                    className="w-6 h-6 ml-8 -mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-4">Events</h2>
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 mb-4">
              <div>
                <img
                  src="path/to/events-preview.jpg"
                  alt="Events"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                  Upcoming Events and Scheduling
                </p>
                <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                  Stay Updated with Events
                </h1>
                <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                  Don’t miss out on the latest events.
                </p>
                <Link
                  to="/events"
                  className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
                >
                  See More
                  <svg
                    className="w-6 h-6 ml-8 -mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="places" className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-4">Places</h2>
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 mb-4">
              <div>
                <img
                  src="path/to/places-preview.jpg"
                  alt="Places"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                  Search, Filters, and Maps
                </p>
                <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                  Find Your Favorite Spots
                </h1>
                <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                  Search, filter, and explore places around you.
                </p>
                <Link
                  to="/places"
                  className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
                >
                  See More
                  <svg
                    className="w-6 h-6 ml-8 -mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 mb-4">
              <div>
                <img
                  src="path/to/about-preview.jpg"
                  alt="About"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                  Learn More About Us
                </p>
                <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                  Who We Are
                </h1>
                <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                  Get to know more about our mission and vision.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
                >
                  See More
                  <svg
                    className="w-6 h-6 ml-8 -mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
