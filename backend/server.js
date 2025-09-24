// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import Routes & Models
const authRoutes = require('./routes/authRoutes.js');
const recipeRoutes = require('./routes/RecipeRoutes.js');
const aiRoutes = require('./routes/aiModelRoutes.js');
const User = require('./models/User');
const Recipe = require('./models/Recipe');

dotenv.config();
const app = express();

// Config
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/recipeApp';

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/ai', aiRoutes);

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // Uncomment if you want to seed recipes on startup:
    // addRecipes();
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

/**
 * Seed Function: Insert sample recipes into DB
 */
const addRecipes = async () => {
  try {
    const user = await User.findOne();
    if (!user) {
      console.log('⚠️ No user found. Please create a user first.');
      return;
    }

    const userId = user._id;

    const recipes = [
      {
        title: 'Spaghetti Bolognese',
        description: 'A classic Italian pasta dish with a rich meat sauce.',
        instructions: ['Cook pasta', 'Prepare meat sauce', 'Combine and serve'],
        ingredients: [
          '200g spaghetti',
          '2 tbsp olive oil',
          '1 onion, finely chopped',
          '2 garlic cloves, minced',
          '400g ground beef',
          '400g canned tomatoes',
          '2 tbsp tomato paste',
          '1 tsp dried oregano',
          '1 tsp dried basil',
          'Salt and pepper to taste',
          'Fresh parsley, chopped',
          'Grated Parmesan cheese (optional)',
        ],
        image:
          'https://www.tamingtwins.com/wp-content/uploads/2025/01/spaghetti-bolognese-10.jpg',
        createdBy: userId,
      },
      {
        title: 'Chicken Curry',
        description: 'A flavorful curry with tender chicken and aromatic spices.',
        instructions: ['Cook chicken', 'Prepare curry sauce', 'Simmer and serve with rice'],
        ingredients: [
          '500g chicken (boneless or bone-in, cut into pieces)',
          '2 tbsp vegetable oil',
          '1 large onion, finely chopped',
          '3 garlic cloves, minced',
          '1-inch piece of ginger, grated',
          '2 tomatoes, pureed',
          '1/2 cup yogurt',
          '1 tsp cumin seeds',
          '1 tsp turmeric powder',
          '1 tsp coriander powder',
          '1 tsp garam masala',
          '1/2 tsp red chili powder',
          'Salt to taste',
          'Fresh coriander leaves for garnish',
        ],
        image:
          'https://www.maggi.in/sites/default/files/srh_recipes/2a707cce6a3fdf601920dea6d0c07a19.PNG',
        createdBy: userId,
      },
      {
        title: 'Vegetable Stir Fry',
        description: 'A quick and healthy stir-fry with a variety of vegetables.',
        instructions: [
          'Wash and prepare vegetables.',
          'Heat oil, sauté garlic.',
          'Add harder veggies first, then softer ones.',
          'Drizzle soy/oyster sauce, toss, season.',
          'Serve hot with rice or noodles.',
        ],
        ingredients: [
          '1 tbsp vegetable oil',
          '1 red bell pepper, sliced',
          '1 yellow bell pepper, sliced',
          '1 carrot, julienned',
          '100g broccoli florets',
          '100g snow peas',
          '1 zucchini, sliced',
          '2 cloves garlic, minced',
          '2 tbsp soy sauce',
          '1 tbsp oyster sauce (optional)',
          '1 tsp sesame oil',
          'Salt & pepper',
          'Sesame seeds (optional)',
        ],
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFhcbP5r6JkEyqPApLr71n6U7GbJTGz8e8w&s',
        createdBy: userId,
      },
      {
        title: 'Grilled Cheese Sandwich',
        description: 'A simple yet delicious grilled cheese sandwich.',
        instructions: [
          'Butter bread slices.',
          'Place cheese inside, butter outside.',
          'Grill until golden brown and cheese melts.',
          'Serve hot.',
        ],
        ingredients: ['2 slices bread', '2 tbsp butter', '2 slices cheese'],
        image:
          'https://wiproappliances.com/cdn/shop/articles/Veg_grilled_cheese_sandwich.jpg?v=1714126819',
        createdBy: userId,
      },
      {
        title: 'Pancakes',
        description: 'Fluffy pancakes served with syrup and berries.',
        instructions: [
          'Mix dry ingredients.',
          'Mix wet ingredients separately.',
          'Combine gently (lumpy batter OK).',
          'Cook on griddle until bubbles form, flip.',
          'Serve hot with syrup/berries.',
        ],
        ingredients: [
          '1 cup flour',
          '2 tbsp sugar',
          '1 tsp baking powder',
          'Pinch of salt',
          '1 egg',
          '1 cup milk',
          '2 tbsp butter (melted)',
          'Syrup, berries (optional)',
        ],
        image:
          'https://www.allrecipes.com/thmb/FE0PiuuR0Uh06uVh1c2AsKjRGbc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21014-Good-old-Fashioned-Pancakes-mfs_002-0e249c95678f446291ebc9408ae64c05.jpg',
        createdBy: userId,
      },
      {
        title: 'Basil Pesto Pizza',
        description:
          'A vibrant pizza topped with fresh basil pesto, mozzarella, cherry tomatoes, and olive oil.',
        instructions: [
          'Preheat oven to 475°F.',
          'Roll out dough, spread pesto.',
          'Top with cheese & tomatoes.',
          'Bake 10–12 mins until golden.',
          'Garnish with basil & olive oil.',
        ],
        ingredients: [
          '1 pizza dough',
          '½ cup basil pesto',
          '1½ cups mozzarella',
          '1 cup cherry tomatoes',
          '2 tbsp Parmesan',
          'Fresh basil',
          '1 tbsp olive oil',
          'Salt & pepper',
        ],
        image:
          'https://res.cloudinary.com/ddamnzrvc/image/upload/v1745782581/sumli0mf5w0t0avidxvr.jpg',
        createdBy: userId,
      },
    ];

    await Recipe.insertMany(recipes);
    console.log('Recipes added successfully');
    process.exit();
  } catch (err) {
    console.error('Error seeding recipes:', err);
    process.exit(1);
  }
};
