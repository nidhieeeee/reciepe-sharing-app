import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

export default function RecipeCreation({ existingRecipe, onSave }) {
    const [title, setTitle] = useState(existingRecipe?.title || "");
    const [description, setDescription] = useState(existingRecipe?.description || "");
    const [category, setCategory] = useState(existingRecipe?.category || "");
    const [ingredients, setIngredients] = useState(existingRecipe?.ingredients || [""]);
    const [steps, setSteps] = useState(existingRecipe?.steps || [""]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(existingRecipe?.image || "");

    const updateIngredient = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const addIngredient = () => setIngredients([...ingredients, ""]);
    const removeIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));

    const updateStep = (index, value) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };

    const addStep = () => setSteps([...steps, ""]);
    const removeStep = (index) => setSteps(steps.filter((_, i) => i !== index));

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const filteredIngredients = ingredients.filter(ingredient => ingredient.trim() !== "");
        const filteredSteps = steps.filter(step => step.trim() !== "");
        
        let imageUrl = ""; 

        if (image) {
            
            const imageData = new FormData();
            imageData.append("file", image);
            imageData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOADS_PRESETS);
            imageData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

            const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
           
    
            try {
                const cloudinaryResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, 
                    imageData
                );
                imageUrl = cloudinaryResponse.data.secure_url;
                console.log("Image uploaded to Cloudinary:", imageUrl);
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("Failed to upload image.");
                return;
            }
        }

        const formData = {
            title:title,
            description:description,
            category:category,
            ingredients:ingredients,
            steps:steps,
            image:imageUrl,
        }
        try {
            
            const response = await axios.post("http://localhost:5000/api/recipes/createRecipe" ,
                formData
                 , {
                    withCredentials:true,
                 }
            ) 
                alert("Recipe Created Successfully!");
                
        } catch (error) {
            console.error("Error creating recipe:", error);
            alert("Failed to create recipe. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-2xl">
                <h2 className="text-2xl font-bold mb-4">{existingRecipe ? "Edit Recipe" : "Create Recipe"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Recipe Title</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md p-2 mt-1" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Description</label>
                        <textarea className="w-full border border-gray-300 rounded-md p-2 mt-1" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Category</label>
                        <select className="w-full border border-gray-300 rounded-md p-2 mt-1" value={category} onChange={(e) => setCategory(e.target.value)} required>
                            <option value="">Select category</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snack">Snack</option>
                            <option value="Dessert">Dessert</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Ingredients</label>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="flex gap-2 mt-1">
                                <input type="text" className="w-full border border-gray-300 rounded-md p-2" value={ingredient} onChange={(e) => updateIngredient(index, e.target.value)} />
                                <button type="button" className="text-red-500" onClick={() => removeIngredient(index)}>✕</button>
                            </div>
                        ))}
                        <button type="button" className="text-blue-500 mt-2" onClick={addIngredient}>+ Add Ingredient</button>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Steps</label>
                        {steps.map((step, index) => (
                            <div key={index} className="flex gap-2 mt-1">
                                <textarea className="w-full border border-gray-300 rounded-md p-2" value={step} onChange={(e) => updateStep(index, e.target.value)} />
                                <button type="button" className="text-red-500" onClick={() => removeStep(index)}>✕</button>
                            </div>
                        ))}
                        <button type="button" className="text-blue-500 mt-2" onClick={addStep}>+ Add Step</button>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Upload Image</label>
                        <input type="file" accept="image/*" className="w-full border border-gray-300 rounded-md p-2 mt-1" onChange={handleImageUpload} />
                        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-lg shadow-md" />}
                    </div>

                    <button type="submit" className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-lg hover:bg-emerald-600 transition">{existingRecipe ? "Update Recipe" : "Create Recipe"}</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
