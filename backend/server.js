const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const userDataRoutes = require("./routes/UserDataRouter");

app.use("/api", userDataRoutes);

mongoose.connect("mongodb://localhost:27017/userData").then(()=> console.log("MongoDB connected")).catch(err => console.log(err));
 app.listen(PORT,()=>{
    console.log("App is running on port 5000");
 });