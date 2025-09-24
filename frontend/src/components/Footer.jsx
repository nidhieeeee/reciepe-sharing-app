import React from "react";
import { Link } from "react-router-dom"; // Use Link for internal navigation
import { Cherry, Facebook, Twitter, Instagram, ArrowRight } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    
                    {/* --- Brand & About Section --- */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <Cherry size={32} className="text-emerald-500" />
                            <span className="text-white text-2xl font-bold">
                                Lush <span className="font-light">Bites</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6">
                            Discover, share, and cook amazing recipes with a passionate community of food lovers from around the world.
                        </p>
                        <div className="flex space-x-4">
                            <SocialIcon href="#" icon={<Facebook size={20} />} />
                            <SocialIcon href="#" icon={<Twitter size={20} />} />
                            <SocialIcon href="#" icon={<Instagram size={20} />} />
                        </div>
                    </div>

                    {/* --- Quick Links Section --- */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><FooterLink to="/recipe">Recipes</FooterLink></li>
                            <li><FooterLink to="/about">About Us</FooterLink></li>
                            <li><FooterLink to="/community">Community</FooterLink></li>
                            <li><FooterLink to="/contact">Contact</FooterLink></li>
                        </ul>
                    </div>

                    {/* --- Legal & Support Section --- */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li><FooterLink to="/faq">Help Center</FooterLink></li>
                            <li><FooterLink to="/privacy">Privacy Policy</FooterLink></li>
                            <li><FooterLink to="/terms">Terms of Service</FooterLink></li>
                        </ul>
                    </div>

                    {/* --- Newsletter Section --- */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Stay Updated</h3>
                        <p className="text-sm mb-4">Get the latest recipes and news delivered to your inbox.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2 text-sm text-slate-900 bg-slate-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <button
                                type="submit"
                                className="bg-emerald-600 text-white p-2 rounded-r-lg hover:bg-emerald-700 transition-colors"
                                aria-label="Subscribe to newsletter"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- Sub-Footer with Copyright --- */}
                <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Lush Bites. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

// --- Helper Components for clean, reusable links ---

const FooterLink = ({ to, children }) => (
    <Link to={to} className="hover:text-emerald-500 transition-colors duration-300">
        {children}
    </Link>
);

const SocialIcon = ({ href, icon }) => (
    <a href={href} className="bg-slate-800 h-10 w-10 flex items-center justify-center rounded-full hover:bg-emerald-600 hover:text-white transition-all duration-300">
        {icon}
    </a>
);

export default Footer;