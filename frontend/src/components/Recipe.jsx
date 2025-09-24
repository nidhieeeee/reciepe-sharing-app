import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Search, Soup, ChefHat, BarChart } from "lucide-react"; // <-- Added BarChart icon
import Navbar from "./Navbar";
import Footer from "./Footer";

// A Skeleton Loader for a better loading experience
const SkeletonCard = () => (
    <div className="bg-white p-4 rounded-2xl shadow-lg animate-pulse">
        <div className="w-full h-48 bg-slate-200 rounded-xl mb-4"></div>
        <div className="h-6 w-3/4 bg-slate-200 rounded mb-2"></div>
        <div className="h-4 w-full bg-slate-200 rounded"></div>
        <div className="h-4 w-1/2 bg-slate-200 rounded mt-1"></div>
        <div className="mt-4 h-10 w-28 bg-slate-200 rounded-lg"></div>
    </div>
);

// --- NEW: Helper function to calculate difficulty ---
const getDifficulty = (recipe) => {
    const ingredientCount = recipe.ingredients?.length || 0;
    const instructionCount = recipe.instructions?.length || 0;
    if (ingredientCount < 10 && instructionCount < 8) {
        return "Easy";
    } else if (ingredientCount > 15 || instructionCount > 12) {
        return "Advanced";
    }
    return "Medium";
};


export default function RecipePage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("cookingWishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });
    const navigate = useNavigate();

    // Fetch recipes from API using async/await and .env variable
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                const apiBaseUrl = import.meta.env.VITE_BASE_URL;
                const response = await fetch(`${apiBaseUrl}/api/recipes`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setRecipes(data.recipes || []);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching recipes", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    // Handle Wishlist Toggling
    const toggleWishlist = (recipe, e) => {
        e.stopPropagation();
        let updatedWishlist;
        if (wishlist.some((item) => item._id === recipe._id)) {
            updatedWishlist = wishlist.filter((item) => item._id !== recipe._id);
        } else {
            updatedWishlist = [...wishlist, recipe];
        }
        setWishlist(updatedWishlist);
        localStorage.setItem("cookingWishlist", JSON.stringify(updatedWishlist));
    };

    // Filter recipes based on search and category
    const filteredRecipes = recipes.filter((recipe) => {
        const matchesCategory = category === "All" || recipe.category === category;
        const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-slate-100 min-h-screen font-sans">
            <Navbar />
            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-slate-800 tracking-tight">Discover Delicious Recipes</h1>
                    <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
                        Explore a world of flavors, from quick snacks to gourmet meals.
                    </p>
                </header>

                <div className="mb-10 p-4 bg-white rounded-xl shadow-md flex flex-col md:flex-row items-center gap-4 sticky top-24 z-40">
                    <div className="relative w-full md:w-2/3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search for a recipe..."
                            className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="w-full md:w-1/3 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Dessert">Desserts</option>
                        <option value="Snack">Snack</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
                    ) : error ? (
                        <p className="text-center text-red-500 col-span-full">Error: {error}</p>
                    ) : filteredRecipes.length > 0 ? (
                        filteredRecipes.map((recipe) => {
                            const isInWishlist = wishlist.some((item) => item._id === recipe._id);
                            // --- NEW: Calculate difficulty for each card ---
                            const difficulty = getDifficulty(recipe);
                            const authorName = recipe.createdBy?.name || 'Lush Bites Team';

                            return (
                                <div
                                    key={recipe._id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group"
                                    onClick={() => navigate(`/recipe/${recipe._id}`)}
                                >
                                    <div className="relative">
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-full h-56 object-cover"
                                        />
                                        <button
                                            onClick={(e) => toggleWishlist(recipe, e)}
                                            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full transition-colors duration-300 hover:bg-white"
                                            aria-label="Add to wishlist"
                                        >
                                            <Heart className={`h-6 w-6 transition-all ${isInWishlist ? 'text-red-500 fill-current' : 'text-slate-600'}`} />
                                        </button>
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        {/* --- UPDATED: Header with category and difficulty --- */}
                                        <div className="flex justify-between items-center text-sm">
                                            <p className="font-medium text-emerald-600">{recipe.category || 'Featured'}</p>
                                            <div className="flex items-center gap-1 text-slate-500">
                                                <BarChart className="h-4 w-4" />
                                                <span className="font-medium">{difficulty}</span>
                                            </div>
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-800 mt-2 truncate group-hover:text-emerald-700 transition-colors">
                                            {recipe.title}
                                        </h2>
                                        <p className="text-slate-500 text-sm mt-2 h-10 overflow-hidden flex-grow">
                                            {recipe.description}
                                        </p>
                                        {/* --- UPDATED: Footer with author info --- */}
                                        <div className="flex items-center text-sm text-slate-500 mt-4 border-t pt-4">
                                            <ChefHat className="h-4 w-4 mr-2" />
                                            <span>By <span className="font-semibold text-slate-700">{authorName}</span></span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center text-slate-500 col-span-full py-20">
                            <Soup className="mx-auto h-12 w-12 text-slate-400" />
                            <h3 className="mt-2 text-lg font-semibold">No Recipes Found</h3>
                            <p>Try adjusting your search or category to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}