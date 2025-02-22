import React, { useState } from "react";
import { Cherry } from 'lucide-react';
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center mb-10">
            {/* Logo / Name */}
            <div className="text-2xl font-bold flex items-center gap-5 ml-5 hover:text-emerald-500 cursor-pointer">
                <Cherry size={50} strokeWidth={1.5} />
                <p>
                    <i>Lush</i> <strong>Bites</strong>
                </p>
            </div>

            {/* Burger Menu (Mobile) */}
            <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                <div className="w-6 h-1 bg-white mb-1"></div>
                <div className="w-6 h-1 bg-white mb-1"></div>
                <div className="w-6 h-1 bg-white"></div>
            </div>

            {/* Navigation Links */}
            <ul
                className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent md:flex gap-6 text-lg transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "flex flex-col items-center py-2" : "hidden md:flex"
                }`}
            >
               <li><a href="/" className=" hover:text-emerald-500">Home</a></li>
      <li><a href="/recipe" className=" hover:text-emerald-500">Recipes</a></li>
      <li><a href="/recipecreation" className=" hover:text-emerald-500">Add Recipes</a></li>
      <li className="hidden md:block"><a href="/signup" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">Log In</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
