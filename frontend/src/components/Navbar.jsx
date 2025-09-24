import React, { useState } from "react";
// For a single-page app (SPA), it's best to use Link from react-router-dom
// To install: npm install react-router-dom
import { Link } from "react-router-dom";
// We'll use more icons for a better mobile experience
import { Cherry, Menu, X } from 'lucide-react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // A reusable component for nav links to avoid repetition
    const NavLink = ({ to, children }) => (
        <li>
            <Link
                to={to}
                className="relative block py-2 px-4 text-lg font-medium text-slate-700 transition-colors duration-300 hover:text-emerald-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full"
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
                {children}
            </Link>
        </li>
    );

    return (
        // Added sticky, z-index, and a subtle backdrop-blur for a modern "glassmorphism" effect
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo / Name */}
                    <Link to="/" className="flex-shrink-0">
                        <div className="flex items-center gap-3 group">
                            <Cherry
                                size={40}
                                strokeWidth={1.5}
                                className="text-emerald-500 transition-transform duration-300 group-hover:rotate-12"
                            />
                            <p className="text-2xl text-slate-800">
                                <span className="font-light">Lush</span>
                                <span className="font-bold">Bites</span>
                            </p>
                        </div>
                    </Link>

                    {/* Navigation Links (Desktop) */}
                    <ul className="hidden md:flex items-center space-x-4">
                        <NavLink to="/recipe">Recipes</NavLink>
                        <NavLink to="/recipecreation">Add Recipe</NavLink>
                        <NavLink to="/userdashboard">My Dashboard</NavLink>
                    </ul>

                    {/* Burger Menu Button (Mobile) */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-emerald-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMenuOpen ? "translate-y-0" : "-translate-y-[150%]"
                } absolute top-full left-0 w-full bg-white shadow-lg`}
            >
                <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                    <NavLink to="/recipe">Recipes</NavLink>
                    <NavLink to="/recipecreation">Add Recipe</NavLink>
                    <NavLink to="/userdashboard">My Dashboard</NavLink>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;