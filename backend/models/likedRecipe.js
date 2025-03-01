const mongoose = require('mongoose')

const LikedRecipeSchema = mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId , ref:"User" , required: true },
    recipeid: { type: mongoose.Schema.Types.ObjectId, ref:"Recipe" , required: true },

})

module.exports = mongoose.model('Like', LikedRecipeSchema)


