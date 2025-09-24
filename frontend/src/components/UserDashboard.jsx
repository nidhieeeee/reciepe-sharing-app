import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaBook, FaHeart, FaUser, FaPlus, FaThumbsUp, FaBookmark } from 'react-icons/fa';

// --- A small, reusable skeleton loader for the stat cards ---
const StatSkeleton = () => (
    <div className="h-9 w-12 bg-slate-200 rounded-md animate-pulse"></div>
);

export default function UserDashboard() {
    const [recipesCount, setRecipesCount] = useState(0);
    const [likedRecipesCount, setLikedRecipesCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const apiBaseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate('/login'); // Redirect if not logged in
                    return;
                }

                const headers = { Authorization: `Bearer ${token}` };

                // 1. Fetch user's created recipes from the backend
                const response = await fetch(`${apiBaseUrl}/api/recipes/my-recipes`, { headers });
                
                if (!response.ok) {
                    throw new Error('Could not fetch your recipes. Please log in again.');
                }
                
                const data = await response.json();
                setRecipesCount(data.recipes?.length || 0);

                // 2. Get liked recipes (wishlist) from localStorage
                const storedWishlist = JSON.parse(localStorage.getItem("cookingWishlist") || "[]");
                setLikedRecipesCount(storedWishlist.length || 0);

            } catch (err) {
                console.error("Dashboard fetch error:", err);
                setError(err.message);
                // On auth error, it's good practice to clear the token and redirect
                localStorage.removeItem("token");
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate, apiBaseUrl]);

    // Mock data for recent activity (can be replaced with dynamic data later)
    const recentActivity = [
        { icon: <FaPlus className="text-green-500" />, text: 'Added a new recipe: "Avocado Toast"', time: "2h ago" },
        { icon: <FaThumbsUp className="text-blue-500" />, text: '"Chicken Curry" got 50 likes!', time: "1d ago" },
        { icon: <FaBookmark className="text-purple-500" />, text: 'Saved "Chocolate Cake" recipe', time: "3d ago" },
    ];

    return (
        <div className="bg-slate-100 min-h-screen font-sans">
            <Navbar />
            
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-800">Welcome Back! 👋</h1>
                    <p className="text-slate-500 mt-2">Here's a summary of your culinary journey.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: My Recipes (Now dynamic) */}
                    <div 
                        className="bg-white p-6 rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl" 
                        onClick={() => navigate("/myrecipe")} // Navigate to profile to see recipes
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <FaBook className="text-green-600 text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-600">My Recipes</h2>
                                {loading ? <StatSkeleton /> : <p className="text-3xl font-bold text-slate-800">{recipesCount}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Liked Recipes (Now dynamic) */}
                    <div 
                        className="bg-white p-6 rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        // Navigate to the profile's wishlist tab
                        onClick={() => navigate("/userprofile")}
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-red-100 p-3 rounded-full">
                                <FaHeart className="text-red-500 text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-600">Liked Recipes</h2>
                                {loading ? <StatSkeleton /> : <p className="text-3xl font-bold text-slate-800">{likedRecipesCount}</p>}
                            </div>
                        </div>
                    </div>
                    
                    {/* Card 3: Personal Info */}
                    <div 
                        className="bg-white p-6 rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl" 
                        onClick={() => navigate("/userprofile")}
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <FaUser className="text-blue-600 text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-600">Personal Info</h2>
                                <p className="text-slate-500">View & Edit Profile</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Recent Activity</h2>
                    {error ? <p className="text-red-500">Could not load activity.</p> :
                    <ul className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <li key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="text-xl">{activity.icon}</div>
                                    <span className="text-slate-700">{activity.text}</span>
                                </div>
                                <span className="text-sm text-slate-400">{activity.time}</span>
                            </li>
                        ))}
                    </ul>
                    }
                </div>
            </main>

            <Footer />
        </div>
    );
}