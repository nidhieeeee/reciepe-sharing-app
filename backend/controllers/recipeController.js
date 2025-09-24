const Recipe = require('../models/Recipe');

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, description, instructions, ingredients, image } = req.body;
    const createdBy = req.user.id;  // Assuming you have user ID in req.user after authentication
    debugger
    console.log(req.user.id)
    const newRecipe = new Recipe({ title, description, instructions, ingredients, image, createdBy });
    await newRecipe.save();

    res.status(201).json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating recipe" });
  }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 }).populate('createdBy');  // newest first
    res.json({ recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

// Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('createdBy');  // Populate createdBy field with user details
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipe" });
  }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming you have user ID in req.user after authentication
    const recipes = await Recipe.find({ createdBy: userId }).sort({ createdAt: -1 });
    res.json({ recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user recipes" });
  }
}

