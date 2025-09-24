import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { UploadCloud, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

const RecipeCreation = () => {
    const navigate = useNavigate();

    // State for the recipe form
    const [recipe, setRecipe] = useState({
        title: "",
        description: "",
        ingredients: "",
        instructionsText: "",
        imageFile: null,
        imagePreview: null,
    });

    // State for handling submission status
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setRecipe((prev) => ({
                ...prev,
                imageFile: file,
                imagePreview: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!recipe.title || !recipe.description || !recipe.ingredients || !recipe.instructionsText || !recipe.imageFile) {
            setError("Please fill out all fields and upload an image.");
            return;
        }

        setLoading(true);
        try {
            // 1. Upload image to Cloudinary
            const formData = new FormData();
            formData.append("file", recipe.imageFile);
            formData.append("upload_preset", "skillbridge"); // Replace with your Cloudinary upload preset

            const cloudRes = await axios.post(
                "https://api.cloudinary.com/v1_1/ddamnzrvc/image/upload", // Replace with your Cloudinary URL
                formData
            );
            const imageUrl = cloudRes.data.secure_url;

            // 2. Prepare recipe object for your backend
            const recipeData = {
                title: recipe.title,
                description: recipe.description,
                image: imageUrl,
                ingredients: recipe.ingredients.split("\n").filter((ing) => ing.trim() !== ""),
                instructions: recipe.instructionsText.split("\n").filter((instr) => instr.trim() !== ""),
            };

            // 3. Send to backend using the environment variable
            const apiBaseUrl = import.meta.env.VITE_BASE_URL;
            await axios.post(`${apiBaseUrl}/api/recipes`, recipeData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            // Navigate on success
            navigate("/recipe"); // Or wherever you want to redirect

        } catch (err) {
            console.error(err);
            setError("An error occurred while creating the recipe. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-100 min-h-screen font-sans">
            <Navbar />
            <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
                    <header className="text-center">
                        <h1 className="text-4xl font-bold text-slate-800">Share Your Creation</h1>
                        <p className="mt-2 text-slate-500">Fill in the details below to add your new recipe.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title Input */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Recipe Title</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={recipe.title}
                                onChange={handleChange}
                                placeholder="e.g., Spicy Thai Green Curry"
                                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            />
                        </div>

                        {/* Image Uploader */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Recipe Image</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg relative bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="space-y-1 text-center">
                                    {recipe.imagePreview ? (
                                        <img src={recipe.imagePreview} alt="Recipe preview" className="mx-auto h-48 w-auto rounded-md object-cover" />
                                    ) : (
                                        <>
                                            <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                                            <p className="text-sm text-slate-500">Drag & drop or <span className="font-semibold text-emerald-600">click to upload</span></p>
                                            <p className="text-xs text-slate-400">PNG, JPG, GIF up to 10MB</p>
                                        </>
                                    )}
                                </div>
                                <input id="file-upload" name="imageFile" type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            </div>
                            {recipe.imageFile && <p className="text-sm text-slate-500 mt-2 text-center">File selected: <span className="font-medium">{recipe.imageFile.name}</span></p>}
                        </div>


                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={recipe.description}
                                onChange={handleChange}
                                rows="3"
                                placeholder="A brief, enticing description of your recipe..."
                                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            />
                        </div>

                        {/* Ingredients & Instructions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="ingredients" className="block text-sm font-medium text-slate-700 mb-1">Ingredients</label>
                                <textarea
                                    id="ingredients"
                                    name="ingredients"
                                    value={recipe.ingredients}
                                    onChange={handleChange}
                                    rows="8"
                                    placeholder={"1 cup flour\n2 large eggs\n1/2 cup sugar\n(One ingredient per line)"}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="instructions" className="block text-sm font-medium text-slate-700 mb-1">Instructions</label>
                                <textarea
                                    id="instructions"
                                    name="instructionsText"
                                    value={recipe.instructionsText}
                                    onChange={handleChange}
                                    rows="8"
                                    placeholder={"1. Mix dry ingredients.\n2. Add wet ingredients.\n3. Bake at 350°F.\n(One step per line)"}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Error Message Display */}
                        {error && (
                            <div className="flex items-center p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                                <AlertTriangle className="w-5 h-5 mr-2" />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4 text-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-10 rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Recipe"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RecipeCreation;