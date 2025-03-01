const mongoose = require('mongoose')

const LikedRecipeSchema = mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId , ref:"User" , required: true },
    recipeid: { type: mongoose.Schema.Types.ObjectId, ref:"Recipe" , required: true },


    //do it done done wohhhhh models are done now omggggggg now??
})

module.exports = mongoose.model('Like', LikedRecipeSchema)

//why did you give it name 'save'??? it will show in saved recipe sooooo but schema is related to likes soo its always preferred to keep same name keep it just Like  doneokay  

//now we will do auth heyeyyyyyyyy
//ehhhhhh its models not modules change name ok