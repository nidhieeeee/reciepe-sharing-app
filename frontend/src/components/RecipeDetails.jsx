import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft, AlertTriangle, Heart, ChefHat,
    BarChart, ShoppingBasket, ListChecks, 
    UtensilsCrossed, List
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";


const RecipeDetailSkeleton = () => (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="h-10 w-32 bg-slate-200 rounded-lg mb-8"></div>
        <div className="w-full h-80 bg-slate-200 rounded-2xl mb-6"></div>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="h-10 w-3/4 bg-slate-200 rounded mb-4"></div>
            <div className="h-4 w-full bg-slate-200 rounded mb-2"></div>
            <div className="h-4 w-5/6 bg-slate-200 rounded mb-6"></div>
            <div className="grid grid-cols-3 gap-4 border-y py-4 mb-8">
                <div className="h-8 bg-slate-200 rounded"></div>
                <div className="h-8 bg-slate-200 rounded"></div>
                <div className="h-8 bg-slate-200 rounded"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <div className="h-8 w-1/2 bg-slate-200 rounded mb-4"></div>
                    <div className="space-y-3">
                        {[...Array(4)].map((_, i) => <div key={i} className="h-5 w-full bg-slate-200 rounded"></div>)}
                    </div>
                </div>
                <div>
                    <div className="h-8 w-1/2 bg-slate-200 rounded mb-4"></div>
                    <div className="space-y-3">
                        {[...Array(4)].map((_, i) => <div key={i} className="h-5 w-full bg-slate-200 rounded"></div>)}
                    </div>
                </div>
            </div>
        </div>
    </div>
);


const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("cookingWishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setLoading(true);
                const apiBaseUrl = import.meta.env.VITE_BASE_URL;
                const response = await fetch(`${apiBaseUrl}/api/recipes/${id}`);
                if (!response.ok) throw new Error("Recipe not found.");
                const data = await response.json();
                setRecipe(data.recipe);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching recipe", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);
    
    const toggleWishlist = () => {
        if (!recipe) return;
        let updatedWishlist;
        if (wishlist.some((item) => item._id === recipe._id)) {
            updatedWishlist = wishlist.filter((item) => item._id !== recipe._id);
        } else {
            updatedWishlist = [...wishlist, recipe];
        }
        setWishlist(updatedWishlist);
        localStorage.setItem("cookingWishlist", JSON.stringify(updatedWishlist));
    };

    if (loading) { /* Skeleton state is unchanged */ 
        return (
            <div className="bg-slate-100 min-h-screen">
                <Navbar /> <RecipeDetailSkeleton /> <Footer />
            </div>
        );
    }
    
    if (error) { /* Error state is unchanged */
        return (
            <div className="bg-slate-100 min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                    <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800">Oops! Something went wrong.</h2>
                    <p className="text-slate-500 mt-2">{error}</p>
                    <button onClick={() => navigate(-1)} className="mt-6 bg-emerald-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-emerald-700 transition-colors">
                        Go Back
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    const isInWishlist = wishlist.some((item) => item._id === recipe._id);
    const authorName = recipe.createdBy?.name || 'Lush Bites Team';

    // --- NEW: Calculate dynamic recipe details ---
    const ingredientCount = recipe.ingredients?.length || 0;
    const instructionCount = recipe.instructions?.length || 0;
    
    let difficulty = "Medium";
    if (ingredientCount < 10 && instructionCount < 8) {
        difficulty = "Easy";
    } else if (ingredientCount > 15 || instructionCount > 12) {
        difficulty = "Advanced";
    }
    // --- END NEW SECTION ---

    return (
        <div className="bg-slate-100 min-h-screen font-sans">
            <Navbar />
            <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 font-semibold mb-8 hover:text-emerald-700 transition-colors">
                    <ArrowLeft size={20} />
                    Back to Recipes
                </button>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-64 md:h-80 object-cover" />
                    <div className="p-6 md:p-10">
                        <header>
                            <div className="flex justify-between items-start gap-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">{recipe.title}</h1>
                                <button
                                    onClick={toggleWishlist}
                                    className="flex-shrink-0 bg-slate-100 p-3 rounded-full transition-transform duration-200 hover:scale-110 active:scale-95"
                                    aria-label="Add to wishlist"
                                >
                                    <Heart className={`h-7 w-7 transition-all ${isInWishlist ? 'text-red-500 fill-current' : 'text-slate-500'}`} />
                                </button>
                            </div>
                            <p className="mt-4 text-lg text-slate-600">{recipe.description}</p>
                            <div className="mt-4 flex items-center gap-3 text-slate-500">
                                <ChefHat className="h-5 w-5" />
                                <p>By <span className="font-semibold text-slate-700">{authorName}</span></p>
                            </div>
                        </header>
                        
                        {/* --- UPDATED: Dynamic Metadata Section --- */}
                        <div className="grid grid-cols-3 gap-4 text-center border-y border-slate-200 my-8 py-4">
                            <div className="flex flex-col items-center justify-center">
                                <BarChart className="h-6 w-6 text-emerald-600 mb-1" />
                                <span className="text-sm text-slate-500">Difficulty</span>
                                <span className="font-bold text-slate-700">{difficulty}</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <ShoppingBasket className="h-6 w-6 text-emerald-600 mb-1" />
                                <span className="text-sm text-slate-500">Ingredients</span>
                                <span className="font-bold text-slate-700">{ingredientCount} items</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <ListChecks className="h-6 w-6 text-emerald-600 mb-1" />
                                <span className="text-sm text-slate-500">Steps</span>
                                <span className="font-bold text-slate-700">{instructionCount} steps</span>
                            </div>
                        </div>
                        {/* --- END UPDATED SECTION --- */}

                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                            <section>
                                {/* ... Ingredients section is unchanged ... */}
                                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-4">
                                    <ListChecks className="text-emerald-600" /> Ingredients
                                </h2>
                                <ul className="space-y-3">
                                    {recipe.ingredients?.map((ingredient, index) => (
                                        <li key={index} className="flex items-center">
                                            <label className="flex items-center text-slate-700 cursor-pointer">
                                                <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mr-3" />
                                                {ingredient}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                {/* ... Instructions section is unchanged ... */}
                                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-4">
                                    <UtensilsCrossed className="text-emerald-600" /> Instructions
                                </h2>
                                <ol className="space-y-4 text-slate-700 list-inside">
                                    {recipe.instructions?.map((step, index) => (
                                        <li key={index} className="flex">
                                            <span className="bg-emerald-600 text-white rounded-full h-6 w-6 text-sm flex items-center justify-center font-bold mr-3 flex-shrink-0">{index + 1}</span>
                                            <p>{step}</p>
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RecipeDetail;