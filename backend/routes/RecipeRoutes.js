const express = require("express");
const router = express.Router();
const multer = require("multer");
const Recipe = require("../models/recipeData");

const storage = multer.diskStorage({
    destination: (req, file, cd) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)

})
const upload = multer({ storage });


router.post("/createRecipe", async (res, req) => {
     try{
        const {title , description,category,ingredients,steps} = req.body;
        const newRecipe = new Recipe({
        userid : req.user.id,
        title,
        description,
        category,
        ingredients,
        steps,
        image : req.file ? req.file.path: null, 
        })
        
        await newRecipe.save();
        res.status(201).json(newRecipe);
     }

     catch(err){
        res.status(500).json({error : err.message});
     }
        
})
router.get("/myrecipe" , async(req,res) =>{
const recipes = await Recipe.find();
res.json(recipes)
})
router.get("/:id" , async(req,res)=>{
    const recipe = await Recipe.findById(req.params.id);

    res.json(recipe);
})
router.delete("/:id",async(req,res)=>{
let recipe = await Recipe.findById(req.params.id);

if(!recipe){
    return res.status(400).json({message: "Recipe not found!"})
    
}
if(recipe.userid.toString() != req.user.id) {
    return res.status(403).json({message: "not authorized"})
}
await Recipe.findByIdAndDelete(req.params.id);
res.json({message: "recipe deleted!!"});
})







