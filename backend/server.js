const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cors({
   origin: 'http://localhost:5173', 
   credentials: true 
}));
app.use(express.json());
app.use(cookieParser()); 

const PORT = 5000;

const userDataRoutes = require("./routes/UserDataRouter");
const recipeDataRoutes = require("./routes/RecipeRoutes");
app.use("/api", userDataRoutes);
app.use("/api/recipes" , recipeDataRoutes);



mongoose.connect(process.env.MONGO_URI).then(()=> console.log("MongoDB connected")).catch(err => console.log(err));
 app.listen(PORT,()=>{
    console.log("App is running on port 5000");
 });