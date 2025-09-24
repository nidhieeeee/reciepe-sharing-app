import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, Heart, Award, Star, Utensils, X, PlusCircle } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
// The ImageWithFallback import has been removed.

// --- A Skeleton Loader for the Profile Page ---
const UserProfileSkeleton = () => (
    <div className="max-w-6xl mx-auto p-4 animate-pulse">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center gap-6 mb-8">
            <div className="h-24 w-24 bg-slate-200 rounded-full"></div>
            <div className="space-y-3">
                <div className="h-8 w-48 bg-slate-200 rounded"></div>
                <div className="h-5 w-64 bg-slate-200 rounded"></div>
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="h-28 bg-slate-200 rounded-xl"></div>
            <div className="h-28 bg-slate-200 rounded-xl"></div>
            <div className="h-28 bg-slate-200 rounded-xl"></div>
            <div className="h-28 bg-slate-200 rounded-xl"></div>
        </div>
        <div className="h-12 w-1/2 bg-slate-200 rounded-lg"></div>
    </div>
);


const UserProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("recipes");
    const [myRecipes, setMyRecipes] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const apiBaseUrl = import.meta.env.VITE_BASE_URL;

    // Combined fetch logic
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found");

                const headers = { Authorization: `Bearer ${token}` };

                const [userRes, recipesRes] = await Promise.all([
                    fetch(`${apiBaseUrl}/api/auth/me`, { headers }),
                    fetch(`${apiBaseUrl}/api/recipes/my-recipes`, { headers })
                ]);

                if (!userRes.ok || !recipesRes.ok) throw new Error("Unauthorized");

                const userData = await userRes.json();
                const recipesData = await recipesRes.json();

                setUser(userData);
                setMyRecipes(recipesData.recipes || []);

                const wishlistFromStorage = JSON.parse(localStorage.getItem("cookingWishlist") || "[]");
                setWishlist(wishlistFromStorage);

            } catch (error) {
                console.error("Error fetching user profile data:", error);
                localStorage.removeItem("token");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate, apiBaseUrl]);

    const userStats = useMemo(() => {
        if (!myRecipes) return {};

        let chefLevel = "Food Enthusiast";
        if (myRecipes.length >= 10) chefLevel = "Culinary Master";
        else if (myRecipes.length >= 5) chefLevel = "Seasoned Chef";
        else if (myRecipes.length >= 1) chefLevel = "Home Cook";

        const categoryCounts = myRecipes.reduce((acc, recipe) => {
            acc[recipe.category] = (acc[recipe.category] || 0) + 1;
            return acc;
        }, {});
        
        const favoriteCategory = Object.keys(categoryCounts).reduce((a, b) => 
            categoryCounts[a] > categoryCounts[b] ? a : b, 
            "N/A"
        );

        return {
            recipesCount: myRecipes.length,
            wishlistCount: wishlist.length,
            chefLevel,
            favoriteCategory,
        };
    }, [myRecipes, wishlist]);

    const removeFromWishlist = (id) => {
        const updatedWishlist = wishlist.filter((item) => item._id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem("cookingWishlist", JSON.stringify(updatedWishlist));
    };

    if (loading) {
        return <div className="bg-slate-100 min-h-screen"><Navbar /><UserProfileSkeleton /><Footer /></div>;
    }

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <Navbar />
            <main className="max-w-6xl mx-auto p-4 md:p-8">
                <header className="flex flex-col sm:flex-row items-center gap-6 mb-8 bg-white rounded-2xl shadow-lg p-8">
                    <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-full h-24 w-24 flex-shrink-0 flex items-center justify-center text-5xl font-bold shadow-md">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-center sm:text-left">
                        <h2 className="text-4xl font-bold text-slate-800">{user.name}</h2>
                        <p className="text-slate-500 text-md mt-1">{user.email}</p>
                        <p className="mt-2 inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full text-sm">
                            <Award size={16} /> {userStats.chefLevel}
                        </p>
                    </div>
                </header>

                <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <StatCard icon={<BookOpen />} label="Recipes Created" value={userStats.recipesCount} />
                    <StatCard icon={<Heart />} label="Wishlist Items" value={userStats.wishlistCount} />
                    <StatCard icon={<Star />} label="Favorite Category" value={userStats.favoriteCategory} />
                    <StatCard icon={<Utensils />} label="Chef Status" value={userStats.chefLevel} />
                </section>

                <div className="mb-8 border-b border-slate-200">
                    <nav className="flex space-x-6">
                        <TabButton active={activeTab === "recipes"} onClick={() => setActiveTab("recipes")} label="My Recipes" />
                        <TabButton active={activeTab === "wishlist"} onClick={() => setActiveTab("wishlist")} label="My Wishlist" />
                    </nav>
                </div>

                <div>
                    {activeTab === "recipes" && <RecipeGrid recipes={myRecipes} navigate={navigate} emptyMessage="You haven't created any recipes yet." actionText="Create a Recipe" actionLink="/recipecreation" />}
                    {activeTab === "wishlist" && <RecipeGrid recipes={wishlist} navigate={navigate} onRemove={removeFromWishlist} emptyMessage="Your wishlist is empty." actionText="Browse Recipes" actionLink="/recipe" />}
                </div>
            </main>
            <Footer />
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4">
        <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-slate-500 text-sm">{label}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const TabButton = ({ active, onClick, label }) => (
    <button onClick={onClick} className={`py-3 px-1 text-md font-semibold transition-colors ${active ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-slate-800'}`}>
        {label}
    </button>
);

const RecipeGrid = ({ recipes, navigate, onRemove, emptyMessage, actionText, actionLink }) => {
    if (recipes.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold text-slate-700">{emptyMessage}</h3>
                <Link to={actionLink} className="mt-4 inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-emerald-700 transition-transform hover:scale-105">
                    <PlusCircle size={20} /> {actionText}
                </Link>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
                <div key={recipe._id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                    <div className="relative">
                        {/* --- MODIFIED: Reverted to a standard <img> tag --- */}
                        <img 
                            src={recipe.image} 
                            alt={recipe.title} 
                            className="w-full h-48 object-cover cursor-pointer" 
                            onClick={() => navigate(`/recipe/${recipe._id}`)} 
                        />
                        {onRemove && (
                            <button onClick={() => onRemove(recipe._id)} className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-red-500 hover:bg-white hover:scale-110 transition-transform">
                                <X size={20} />
                            </button>
                        )}
                    </div>
                    <div className="p-5">
                        <h4 className="text-lg font-bold text-slate-800 truncate group-hover:text-emerald-700">{recipe.title}</h4>
                        <p className="text-sm text-slate-500 mt-1 h-10 overflow-hidden">{recipe.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default UserProfile;