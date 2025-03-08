import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
const MyRecipes = () => {
    const navigate = useNavigate();


    const [recipes, setRecipes] = useState([
        {
            id: 1,
            title: "Paneer Butter Masala",
            description: "Creamy and rich paneer curry cooked in a tomato-based gravy.",
            image: "https://media.istockphoto.com/id/1292629539/photo/paneer-tikka-masala-is-a-famous-indian-dish-served-over-a-rustic-wooden-background-selective.jpg?s=612x612&w=0&k=20&c=GCvoJ3lBcvvRJmeENmSpa_7rLkh_1OKPaM6gKNYqUGM=",
            category: "Main Course",
            ingredients: ["Paneer", "Tomatoes", "Cream", "Butter", "Garam Masala"],
            steps: [
                "Sauté onions, tomatoes, and spices in butter.",
                "Blend into a smooth paste and cook with cream.",
                "Add paneer cubes and simmer until soft.",
                "Garnish with coriander and serve hot."
            ],
        },
        {
            id: 2,
            title: "Dal Tadka",
            description: "Lentils cooked with a flavorful tempering of garlic and spices.",
            image: "https://www.shutterstock.com/image-photo/indian-dal-traditional-soup-lentils-600nw-1312092353.jpg",
            category: "Main Course",
            ingredients: ["Toor Dal", "Garlic", "Tomatoes", "Mustard Seeds", "Ghee"],
            steps: [
                "Cook toor dal until soft.",
                "Prepare tempering with ghee, garlic, mustard seeds, and spices.",
                "Pour over dal and mix well.",
                "Serve with steamed rice."
            ],
        }
    ]);
useEffect(()=>{
    
        const fetchMyRecipe = async () =>{
            try {
            const response = await axios.get("http://localhost:5000/api/recipes/myRecipe",
                {
                    withCredentials:true
                }
            )
            setRecipes(response.data)
        
    } catch (err) {
        console.log(err);
    }
}
        fetchMyRecipe();
    
},[])
    const removeRecipe = (id) => {
        const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
        setRecipes(updatedRecipes);
    };

    return (
        <div><Navbar />
        <div className="bg-gray-50 text-gray-900 px-6 py-10">
            <h1 className="text-4xl font-bold text-center mb-6">My Recipes</h1>

            {recipes.length === 0 ? (
                <p className=" h-88 text-center text-gray-600 text-lg">No recipes found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
                        >
                            <img
                                className="w-full h-48 object-cover"
                                src={recipe.image}
                                alt={recipe.title}
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{recipe.title}</h3>
                                <p className="text-gray-600 mt-2 line-clamp-2">
                                    {recipe.description}
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    <span className="font-semibold">Ingredients:</span> {recipe.ingredients.join(", ")}
                                </p>
                                <h3 className="mt-4 font-semibold text-lg">Steps:</h3>
                                <ol className="list-decimal pl-5 mt-2 text-gray-700">
                                    {recipe.steps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                                <div className="mt-4 flex justify-between">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                        onClick={() => navigate("/recipecreation")}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                        onClick={() => removeRecipe(recipe.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <Footer />
        </div>
    );
};

export default MyRecipes;

