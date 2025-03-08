const express = require("express");
const router = express.Router();
const multer = require("multer");
const Recipe = require("../models/recipeData");
const auth = require("../middleware/authMiddleware")
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "uploads/"),
//     filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)

// })wooohooooo!!!!!! oki bruh failed to create bata rhe ammmm screenshot bhej to

// const upload = multer({ storage }); done! now create recipe using form



router.post("/createRecipe", auth, async (req, res) => {
    try {
        const { title, description, category, ingredients, steps, image } = req.body;
        

        const newRecipe = new Recipe({
            userid: req.user.id,
            title,
            description,
            category,
            ingredients: ingredients,
            steps:steps,
            image: image,
        })

        await newRecipe.save();
        res.status(201).json(newRecipe);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }

})


router.get("/allRecipe", async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes)
})

router.get("/myRecipe", auth, async (req, res) => {

    try {
        const id = req.user.id;
        const myRecipes = await Recipe.find({ userid: id });
        res.json(myRecipes);
    } catch (error) {
        res.status(500).json({ error: `${error}` });
    }
})
router.get("/:id", async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    res.json(recipe);
})

router.delete("/:id", auth, async (req, res) => {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
        return res.status(400).json({ message: "Recipe not found!" })

    }
    if (recipe.userid.toString() != req.user.id) {
        return res.status(403).json({ message: "not authorized" })
    }
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "recipe deleted!!" });
})
module.exports = router;







