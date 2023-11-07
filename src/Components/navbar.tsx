import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white fixed top-0 w-full shadow-md p-4 flex items-center justify-between">
            <Link to="/" className="text-3xl font-bold text-purple-600 hover:text-blue-600">Wishy</Link>
            <div className="flex space-x-4">
                <Link to="/profile" className="text-lg text-purple-600 hover:text-blue-600">Profile</Link>
                <Link to="/search" className="text-lg text-purple-600 hover:text-blue-600">Search</Link>
            </div>
        </nav>
    );
};

export default Navbar;