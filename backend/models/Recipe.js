const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructions: {
    type: [String],  // Array of steps
    required: true
  },
  ingredients: {
    type: [String],  // Array of ingredients
    required: true
  },
  image: {
    type: String,  // URL of the image
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
