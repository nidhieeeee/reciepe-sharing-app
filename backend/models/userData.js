const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobileNo: { type: String, required: true },
    bio: { type: String, required: true },
   role:{type:String , enum: ["homeCook" , "chef" , "foodBlogger"] , default:"homeCook"},
})

module.exports = mongoose.model('User', UserSchema)
