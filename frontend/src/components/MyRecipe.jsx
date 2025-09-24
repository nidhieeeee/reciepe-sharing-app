import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { PlusCircle, BookOpen, Trash2 } from 'lucide-react';

// A Skeleton Loader for a consistent loading experience
const RecipeCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg animate-pulse">
        <div className="w-full h-48 bg-slate-200 rounded-t-2xl"></div>
        <div className="p-5">
            <div className="h-6 w-3/4 bg-slate-200 rounded mb-3"></div>
            <div className="h-4 w-full bg-slate-200 rounded"></div>
            <div className="h-4 w-1/2 bg-slate-200 rounded mt-2"></div>
        </div>
    </div>
);


const MyRecipes = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiBaseUrl = import.meta.env.VITE_BASE_URL;

    // --- Fetch User's Recipes from the Backend ---
    useEffect(() => {
        const fetchMyRecipes = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            
            try {
                setLoading(true);
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(
                    `${apiBaseUrl}/api/recipes/my-recipes`, 
                    { headers }
                );
                setRecipes(response.data.recipes || []);
            } catch (err) {
                console.error("Error fetching my recipes:", err);
                setError("Failed to load recipes. Please try logging in again.");
                if (err.response && err.response.status === 401) {
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMyRecipes();
    }, [apiBaseUrl, navigate]);

    // --- Handle Recipe Deletion ---
    const handleRemoveRecipe = async (recipeId, e) => {
        e.stopPropagation(); // Prevent the card's onClick from firing

        if (window.confirm("Are you sure you want to delete this recipe?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`${apiBaseUrl}/api/recipes/${recipeId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Remove the recipe from the state for an immediate UI update
                setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeId));
            } catch (err) {
                console.error("Error deleting recipe:", err);
                alert("Failed to delete recipe. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <Navbar />
            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* --- Page Header --- */}
                <header className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-4 border-b border-slate-200">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">My Creations</h1>
                        <p className="mt-2 text-slate-500">A collection of all the recipes you've shared.</p>
                    </div>
                    <button 
                        onClick={() => navigate("/recipecreation")}
                        className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-emerald-700 transition-transform hover:scale-105 shadow-md">
                        <PlusCircle size={20} />
                        Add New Recipe
                    </button>
                </header>
                
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {/* --- Content Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        // --- Loading State: Show Skeletons ---
                        Array.from({ length: 3 }).map((_, index) => <RecipeCardSkeleton key={index} />)
                    ) : recipes.length === 0 && !error ? (
                        // --- Empty State ---
                        <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-md">
                            <BookOpen className="mx-auto h-16 w-16 text-slate-400" />
                            <h3 className="mt-4 text-xl font-semibold text-slate-700">No Recipes Yet</h3>
                            <p className="mt-2 text-slate-500">Looks like you haven't created any recipes. Let's change that!</p>
                            <button
                                onClick={() => navigate("/recipecreation")}
                                className="mt-6 inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-emerald-700 transition-transform hover:scale-105"
                            >
                                <PlusCircle size={20} />
                                Create Your First Recipe
                            </button>
                        </div>
                    ) : (
                        // --- Recipe List ---
                        recipes.map((recipe) => (
                            <div
                                key={recipe._id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer"
                                onClick={() => navigate(`/recipe/${recipe._id}`)}
                            >
                                <div className="relative">
                                    <img
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                        src={recipe.image}
                                        alt={recipe.title}
                                    />
                                    {/* --- REMOVE BUTTON (view only, no edit) --- */}
                                    <button
                                        onClick={(e) => handleRemoveRecipe(recipe._id, e)}
                                        className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 hover:scale-110"
                                        aria-label="Remove Recipe"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-slate-800 truncate group-hover:text-emerald-700">{recipe.title}</h3>
                                    <p className="text-sm text-slate-500 mt-2 h-10 overflow-hidden line-clamp-2">
                                        {recipe.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MyRecipes;