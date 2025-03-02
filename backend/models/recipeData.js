const mongoose = require('mongoose')

const RecipeSchema = mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId , ref:"User" , required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
   
})
module.exports = mongoose.model('Recipe', RecipeSchema)