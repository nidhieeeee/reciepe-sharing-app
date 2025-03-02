import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function UserDashboard() {
    const [recipesCount, setRecipesCount] = useState(24);
    const [likedRecipes, setLikedRecipes] = useState(15);
    const navigate = useNavigate();
    return (
        <div><Navbar />
            <div className="bg-white text-gray-900 p-6">
                <h1 className="text-4xl font-bold text-center mb-10">📖 User Dashboard</h1>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-10 bg-emerald-500 text-white rounded-lg shadow-md text-center" onClick={()=>navigate("/myrecipe")}>
                        <h1 className="text-lg font-semibold " >My Recipes</h1>
                    </div>
                    <div className="p-10 bg-emerald-500 text-white rounded-lg shadow-md text-center">
                        <h1 className="text-lg font-semibold">Liked Recipes</h1>
                    </div>
                    <div className="p-10 bg-emerald-500 text-white rounded-lg shadow-md text-center" onClick={()=>navigate("/userprofile")}>
                        <h1 className="text-lg font-semibold">Personal Info</h1>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-10 p-6 bg-emerald-500 text-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
                    <ul className="space-y-3">
                        <li className="border-b border-emerald-300 pb-2">🥗 Added a new recipe: "Avocado Toast"</li>
                        <li className="border-b border-emerald-300 pb-2">🍲 "Chicken Curry" got 50 likes!</li>
                        <li className="border-b border-emerald-300 pb-2">🍰 Saved "Chocolate Cake" recipe</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

