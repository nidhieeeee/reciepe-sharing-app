const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/userData").then(()=> console.log("MongoDB connected")).catch(err => console.log(err));
 app.listen(PORT,()=>{
    console.log("App is running on port 5000");
 });