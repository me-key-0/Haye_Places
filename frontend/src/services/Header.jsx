import React from 'react';
import { Link } from 'react-router-dom';
import user from './user.data';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: user
        };
    }

    render() {
        return (
            <div>
                {/* Header with Logo and Sign-In Button */}
                <header className="bg-[#FCF8F1] shadow-md fixed top-0 left-0 w-full z-50 flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
                    <Link to="/">
                        <img
                            src="C:/Users/No One/Documents/Internship/Haye_Places/frontend/src/assets/Haye_light.png"
                            alt="Logo"
                            className="w-auto h-8"
                        />
                    </Link>
                    <nav className="flex">
                        <ul className="flex gap-8">
                            <li>
                                <Link to="/explore" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                                    Explore
                                </Link>
                            </li>
                            <li>
                                <Link to="/events" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/places" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                                    Places
                                </Link>
                            </li>
                            <li>
                                <Link to="#about" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <Link
                        to="/signin"
                        className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
                    >
                        {this.state.user.isSignedIn ? 'Sign Out' : 'Sign In'}
                    </Link>
                </header>
            </div>
        );
    }
}

export default Header;
