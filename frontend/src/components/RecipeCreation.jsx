import React, { useState } from "react";

export default function RecipeCreation({ existingRecipe, onSave }) {
    const [title, setTitle] = useState(existingRecipe?.title || "");
    const [description, setDescription] = useState(existingRecipe?.description || "");
    const [category, setCategory] = useState(existingRecipe?.category || "");
    const [ingredients, setIngredients] = useState(existingRecipe?.ingredients || [""]);
    const [steps, setSteps] = useState(existingRecipe?.steps || [""]);
    const [image, setImage] = useState(existingRecipe?.image || "");
    const [imagePreview, setImagePreview] = useState(existingRecipe?.image || "");

    // Handle ingredient input changes
    const updateIngredient = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    // Add new ingredient field
    const addIngredient = () => setIngredients([...ingredients, ""]);

    // Remove ingredient field
    const removeIngredient = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };

    // Handle step input changes
    const updateStep = (index, value) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };

    // Add new step field
    const addStep = () => setSteps([...steps, ""]);

    // Remove step field
    const removeStep = (index) => {
        const newSteps = steps.filter((_, i) => i !== index);
        setSteps(newSteps);
    };

    // Handle image upload and preview
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
            setImage(file);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, description, category, ingredients, steps, image });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">{existingRecipe ? "Edit Recipe" : "Create Recipe"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-gray-700 font-medium">Recipe Title</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 mt-1"
                        placeholder="Enter recipe title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 font-medium">Description</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-2 mt-1"
                        placeholder="Short description of the recipe"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-gray-700 font-medium">Category</label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2 mt-1"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select category</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snack">Snack</option>
                        <option value="Dessert">Dessert</option>
                    </select>
                </div>

                {/* Ingredients */}
                <div>
                    <label className="block text-gray-700 font-medium">Ingredients</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex gap-2 mt-1">
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Ingredient"
                                value={ingredient}
                                onChange={(e) => updateIngredient(index, e.target.value)}
                            />
                            <button type="button" className="text-red-500" onClick={() => removeIngredient(index)}>✕</button>
                        </div>
                    ))}
                    <button type="button" className="text-blue-500 mt-2" onClick={addIngredient}>+ Add Ingredient</button>
                </div>

                {/* Steps */}
                <div>
                    <label className="block text-gray-700 font-medium">Steps</label>
                    {steps.map((step, index) => (
                        <div key={index} className="flex gap-2 mt-1">
                            <textarea
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Step description"
                                value={step}
                                onChange={(e) => updateStep(index, e.target.value)}
                            />
                            <button type="button" className="text-red-500" onClick={() => removeStep(index)}>✕</button>
                        </div>
                    ))}
                    <button type="button" className="text-blue-500 mt-2" onClick={addStep}>+ Add Step</button>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-gray-700 font-medium">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full border border-gray-300 rounded-md p-2 mt-1"
                        onChange={handleImageUpload}
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-lg shadow-md" />
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-lg hover:bg-emerald-600 transition"
                >
                    {existingRecipe ? "Update Recipe" : "Create Recipe"}
                </button>
            </form>
        </div>
    );
}
