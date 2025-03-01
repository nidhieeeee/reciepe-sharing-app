const express = require("express");
const router = express.Router();
const likedRecipe = require("../models/likedRecipe");

router.post("/likedrecipe" , async (req,res)=>{
try{
        const newLikedRecipe = new likedRecipe({
        userid : req.user.id,
        recipeid : req.recipeid,
        })
        
        await newLikedRecipe.save();
        res.status(201).json(newLikedRecipe);
     }

     catch(err){
        res.status(500).json({error : err.message});
     }
})

router.get("/:id" , async(req,res)=>{
    const likedrecipe = await likedRecipe.findById(req.params.id);
    res.json(likedrecipe);
})