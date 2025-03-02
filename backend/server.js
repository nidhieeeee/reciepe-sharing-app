const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({
   origin: 'http://localhost:5173', 
   credentials: true 
}));
app.use(express.json());

const PORT = 5000;

const userDataRoutes = require("./routes/UserDataRouter");
const recipeDataRoutes = require("./routes/RecipeRoutes");
app.use("/api", userDataRoutes);
app.use("/api/recipes" , recipeDataRoutes);
app.use(cookieParser());


mongoose.connect("mongodb://localhost:27017/userData").then(()=> console.log("MongoDB connected")).catch(err => console.log(err));
 app.listen(PORT,()=>{
    console.log("App is running on port 5000");
 });