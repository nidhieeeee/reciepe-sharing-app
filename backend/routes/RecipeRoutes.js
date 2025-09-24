const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middlewares/authMiddleware');
// const jsonData = require('../../data/recipeApp.recipes.json')
const Recipe = require('../models/Recipe'); 

// Create recipe
router.post('/', authMiddleware, recipeController.createRecipe);

// Get user recipes
router.get('/my-recipes', authMiddleware, recipeController.getUserRecipes);

// Get all recipes
router.get('/', recipeController.getAllRecipes);

// Get single recipe
router.get('/:id', recipeController.getRecipeById);



module.exports = router;
