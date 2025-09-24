const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User');
const Recipe = require('./models/Recipe'); // Import the Recipe model

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/recipeApp';

// Middleware
app.use(cors(
   {
      origin: 'http://localhost:5173', // Replace with your frontend URL
      credentials: true,
   }
));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', require('./routes/recipeRoutes'));
app.use("/api/ai", require("./routes/aiModelRoutes"));


// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    //addRecipes(); // Call the function to add recipes after successful connection
})
  .catch(err => console.error('MongoDB connection error:', err));

//listening to the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


const addRecipes = async () => {
    try {
      // Get a user ID to associate recipes with
      const user = await User.findOne(); // Make sure you have at least one user in your DB
      if (!user) {
        console.log('No user found, please create a user first.');
        return;
      }
  
      const userId = user._id; // Get the user ID
  
      const recipes = [
        {
          title: "Spaghetti Bolognese",
          description: "A classic Italian pasta dish with a rich meat sauce.",
          instructions: [
            "Cook pasta",
            "Prepare meat sauce",
            "Combine and serve"
          ],
          ingredients: [
            "200g spaghetti",
            "2 tbsp olive oil",
            "1 onion, finely chopped",
            "2 garlic cloves, minced",
            "400g ground beef",
            "400g canned tomatoes",
            "2 tbsp tomato paste",
            "1 tsp dried oregano",
            "1 tsp dried basil",
            "Salt and pepper to taste",
            "Fresh parsley, chopped (for garnish)",
            "Grated Parmesan cheese (optional)"
          ],
          image: "https://www.tamingtwins.com/wp-content/uploads/2025/01/spaghetti-bolognese-10.jpg",
          createdBy: userId // Replace userId with the actual user ID
        },
        {
          title: "Chicken Curry",
          description: "A flavorful curry with tender chicken and aromatic spices.",
          instructions: [
            "Cook chicken",
            "Prepare curry sauce",
            "Simmer and serve with rice"
          ],
          ingredients: [
            "500g chicken (boneless or bone-in, cut into pieces)",
            "2 tbsp vegetable oil",
            "1 large onion, finely chopped",
            "3 garlic cloves, minced",
            "1-inch piece of ginger, grated",
            "2 tomatoes, pureed",
            "1/2 cup yogurt",
            "1 tsp cumin seeds",
            "1 tsp turmeric powder",
            "1 tsp coriander powder",
            "1 tsp garam masala",
            "1/2 tsp red chili powder",
            "Salt to taste",
            "Fresh coriander leaves for garnish"
          ],
          image: "https://www.maggi.in/sites/default/files/srh_recipes/2a707cce6a3fdf601920dea6d0c07a19.PNG",
          createdBy: userId // Replace userId with the actual user ID
        },
        {
          title: "Vegetable Stir Fry",
          description: "A quick and healthy stir-fry with a variety of vegetables.",
          instructions: [
            "Wash and prepare all the vegetables by slicing them into bite-sized pieces.",
            "Heat 1 tablespoon of vegetable oil in a large wok or skillet over medium-high heat.",
            "Add minced garlic and stir-fry for about 30 seconds until fragrant.",
            "Add the harder vegetables first (carrots, broccoli) and stir-fry for 2-3 minutes.",
            "Next, add softer vegetables (bell peppers, zucchini, snow peas) and continue stir-frying for another 3-4 minutes until they are just tender but still crisp.",
            "Drizzle in the soy sauce, oyster sauce (if using), and sesame oil. Toss everything together to evenly coat the vegetables.",
            "Season with salt and pepper to taste. Stir-fry for another 1-2 minutes.",
            "Remove from heat and garnish with sesame seeds if desired.",
            "Serve immediately with steamed rice or noodles for a complete meal."
          ],
          ingredients: [
            "1 tbsp vegetable oil",
            "1 red bell pepper, sliced",
            "1 yellow bell pepper, sliced",
            "1 carrot, julienned",
            "100g broccoli florets",
            "100g snow peas",
            "1 zucchini, sliced",
            "2 cloves garlic, minced",
            "2 tbsp soy sauce",
            "1 tbsp oyster sauce (optional)",
            "1 tsp sesame oil",
            "Salt and pepper to taste",
            "Sesame seeds for garnish (optional)"
          ],
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFhcbP5r6JkEyqPApLr71n6U7GbJTGz8e8w&s",
          createdBy: userId // Replace userId with the actual user ID
        },
        {
          title: "Grilled Cheese Sandwich",
          description: "A simple yet delicious grilled cheese sandwich.",
          instructions: [
            "Start by buttering one side of each slice of bread with softened butter. Make sure to cover the entire surface evenly.",
            "Place a slice of cheese between the two slices of bread, with the buttered sides facing outwards.",
            "Heat a non-stick skillet or grill pan over medium heat. Once hot, place the sandwich on the pan.",
            "Grill for about 2-3 minutes on each side, pressing gently with a spatula until golden brown and the cheese is fully melted.",
            "Serve the grilled cheese sandwich immediately while it's hot and crispy."
          ],
          ingredients: [
            "2 slices of bread (your choice of bread)",
            "2 tbsp butter (softened)",
            "2 slices of cheese (cheddar, American, or your preference)"
          ],
          image: "https://wiproappliances.com/cdn/shop/articles/Veg_grilled_cheese_sandwich.jpg?v=1714126819",
          createdBy: userId // Replace userId with the actual user ID
        },
        {
          title: "Pancakes",
          description: "Fluffy pancakes served with syrup and berries.",
          instructions: [
            "In a large bowl, whisk together 1 cup of flour, 2 tablespoons of sugar, 1 teaspoon of baking powder, and a pinch of salt.",
            "In a separate bowl, whisk 1 egg, 1 cup of milk, and 2 tablespoons of melted butter or oil.",
            "Combine the wet ingredients with the dry ingredients, stirring until just combined (it’s okay if the batter is a little lumpy).",
            "Heat a griddle or non-stick skillet over medium heat and lightly grease it with butter or oil.",
            "Pour about 1/4 cup of batter onto the griddle for each pancake, cooking until bubbles form on the surface (about 2-3 minutes).",
            "Flip the pancakes and cook for another 1-2 minutes, until golden brown on both sides.",
            "Serve hot with syrup, fresh berries, and a dusting of powdered sugar if desired."
          ],
          ingredients: [
            "1 cup all-purpose flour",
            "2 tbsp sugar",
            "1 tsp baking powder",
            "Pinch of salt",
            "1 egg",
            "1 cup milk",
            "2 tbsp butter or oil (melted)",
            "Butter or oil for greasing the griddle",
            "Syrup, fresh berries, and powdered sugar (optional, for serving)"
          ],
          image: "https://www.allrecipes.com/thmb/FE0PiuuR0Uh06uVh1c2AsKjRGbc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21014-Good-old-Fashioned-Pancakes-mfs_002-0e249c95678f446291ebc9408ae64c05.jpg",
          createdBy: userId // Replace userId with the actual user ID
        },
        {
          title: "Basil Pesto Pizza",
          description: "A vibrant, flavorful pizza topped with fresh basil pesto, mozzarella, cherry tomatoes, and a drizzle of olive oil. Perfect for a quick weeknight dinner or weekend gathering!",
          instructions: [
            "Preheat your oven to 475°F (245°C). If using a pizza stone, place it in the oven to heat up; otherwise, line a baking sheet with parchment paper.",
            "On a lightly floured surface, roll out the pizza dough to a 12-inch circle (or desired thickness). Transfer to a pizza peel dusted with cornmeal or onto your prepared baking sheet.",
            "Spread the basil pesto evenly over the dough, leaving a ½-inch border around the edge for the crust.",
            "Sprinkle the shredded mozzarella cheese evenly over the pesto layer.",
            "Arrange the halved cherry tomatoes on top of the cheese, spacing them out evenly.",
            "Sprinkle the grated Parmesan cheese over the pizza, then season lightly with salt, black pepper, and red pepper flakes if using.",
            "Bake in the preheated oven for 10–12 minutes, or until the crust is golden brown and the cheese is bubbly and starting to brown.",
            "Remove the pizza from the oven and immediately drizzle with the extra-virgin olive oil. Scatter the torn fresh basil leaves over the top.",
            "Let the pizza rest for 2–3 minutes, then slice and serve hot. Enjoy!"
          ],
          ingredients: [
            "1 pizza dough (store-bought or homemade)",
            "½ cup basil pesto sauce",
            "1 ½ cups shredded mozzarella cheese",
            "1 cup cherry tomatoes, halved",
            "2 tablespoons grated Parmesan cheese",
            "2 tablespoons fresh basil leaves, torn",
            "1 tablespoon extra-virgin olive oil",
            "Salt and freshly ground black pepper, to taste",
            "Red pepper flakes (optional)"
          ],
          image: "https://res.cloudinary.com/ddamnzrvc/image/upload/v1745782581/sumli0mf5w0t0avidxvr.jpg",
          createdBy: userId // Replace userId with the actual user ID
        }
      ];
      
  
      await Recipe.insertMany(recipes); // Insert multiple recipes into the database
  
      console.log('Recipes added successfully');
      process.exit();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

