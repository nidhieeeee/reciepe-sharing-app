import { useState } from "react";
import { Heart } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const recipesData = [
    {
      id: 1,
      title: "Paneer Butter Masala",
      description: "Creamy and rich paneer curry cooked in a tomato-based gravy.",
      image: "https://media.istockphoto.com/id/1292629539/photo/paneer-tikka-masala-is-a-famous-indian-dish-served-over-a-rustic-wooden-background-selective.jpg?s=612x612&w=0&k=20&c=GCvoJ3lBcvvRJmeENmSpa_7rLkh_1OKPaM6gKNYqUGM=",
      category: "Main Course",
      ingredients: ["Paneer", "Tomatoes", "Cream", "Butter", "Garam Masala"],
      steps: [
        "Sauté onions, tomatoes, and spices in butter.",
        "Blend into a smooth paste and cook with cream.",
        "Add paneer cubes and simmer until soft.",
        "Garnish with coriander and serve hot."
      ],
    },
    {
      id: 2,
      title: "Dal Tadka",
      description: "Lentils cooked with a flavorful tempering of garlic and spices.",
      image: "https://www.shutterstock.com/image-photo/indian-dal-traditional-soup-lentils-600nw-1312092353.jpg",
      category: "Main Course",
      ingredients: ["Toor Dal", "Garlic", "Tomatoes", "Mustard Seeds", "Ghee"],
      steps: [
        "Cook toor dal until soft.",
        "Prepare tempering with ghee, garlic, mustard seeds, and spices.",
        "Pour over dal and mix well.",
        "Serve with steamed rice."
      ],
    },
    {
      id: 3,
      title: "Aloo Paratha",
      description: "Stuffed Indian bread filled with spiced mashed potatoes.",
      image: "https://media.istockphoto.com/id/1432760289/photo/aloo-paratha-or-potato-stuffed-flat-bread-on-a-wooden-background-served-with-curd-and-sauce.jpg?s=612x612&w=0&k=20&c=_LMnQIp4ri0hhqCVf4uzJsagVWkZYW_3P86t5LZybPI=",
      category: "Breakfast",
      ingredients: ["Wheat Flour", "Potatoes", "Green Chilies", "Cumin", "Butter"],
      steps: [
        "Prepare dough and keep aside.",
        "Mix mashed potatoes with spices and chilies.",
        "Stuff dough with filling and roll into paratha.",
        "Cook on tawa with butter until golden brown."
      ],
    },
    {
      id: 4,
      title: "Chole Bhature",
      description: "A spicy chickpea curry served with deep-fried fluffy bread.",
      image: "https://media.istockphoto.com/id/1488738112/photo/chole-bhature-punjabi-bhature.jpg?s=612x612&w=0&k=20&c=AgB-aaS0QV-Ha0_d0Ltjm7mdMXO_VAgLzKVAth82N8k=",
      category: "Lunch",
      ingredients: ["Chickpeas", "Flour", "Tomatoes", "Onions", "Spices"],
      steps: [
        "Cook chickpeas with tomatoes, onions, and spices.",
        "Knead dough and let it rest.",
        "Roll and deep-fry to make bhature.",
        "Serve hot with chole."
      ],
    },
    {
      id: 5,
      title: "Masala Dosa",
      description: "Crispy rice crepes filled with a spiced potato filling.",
      image: "https://t3.ftcdn.net/jpg/00/37/81/84/360_F_37818424_iEAeI3ngDZ3pNwQ8iZvm2AIDzVDRQmhz.jpg",
      category: "Breakfast",
      ingredients: ["Rice", "Lentils", "Potatoes", "Curry Leaves", "Coconut Chutney"],
      steps: [
        "Soak and grind rice and lentils to make dosa batter.",
        "Prepare potato filling with spices and curry leaves.",
        "Spread batter thinly on a pan and cook until crispy.",
        "Fill with potato masala and serve with chutney."
      ],
    },
    {
      id: 6,
      title: "Pani Puri",
      description: "Crispy puris filled with tangy tamarind water and spicy stuffing.",
      image: "https://t3.ftcdn.net/jpg/04/94/92/18/360_F_494921881_UCVG7kgihpMUbbDC5VxuufeI7B5TQBr0.jpg",
      category: "Snack",
      ingredients: ["Puris", "Potatoes", "Chickpeas", "Tamarind", "Mint"],
      steps: [
        "Prepare tamarind water with spices and mint.",
        "Mash potatoes and mix with chickpeas.",
        "Stuff puris with filling and pour tamarind water.",
        "Enjoy immediately!"
      ],
    },
    {
      id: 7,
      title: "Rajma Chawal",
      description: "A wholesome meal of kidney bean curry served with rice.",
      image: "https://media.istockphoto.com/id/1451840010/photo/rajma-chawal-an-indian-food.jpg?s=612x612&w=0&k=20&c=d6lr1LvQgPDknSBe33NMJZQs2CwAyfliyHYFKkkRxOk=",
      category: "Lunch",
      ingredients: ["Rajma", "Tomatoes", "Onions", "Garlic", "Rice"],
      steps: [
        "Soak and cook rajma until soft.",
        "Prepare a thick gravy with tomatoes, onions, and garlic.",
        "Simmer rajma in the gravy until flavorful.",
        "Serve with steamed rice."
      ],
    },
    {
      id: 8,
      title: "Samosa",
      description: "Deep-fried triangular pastry filled with spiced potato stuffing.",
      image: "https://media.istockphoto.com/id/1299380316/photo/samosa-with-chutney-in-plate-asian-breakfast-aloo-samosa.jpg?s=612x612&w=0&k=20&c=5qZx0Iz-lyuETPv9SS1lVge2yw2gI3iAA4ArRp7yuu8=",
      category: "Snack",
      ingredients: ["Flour", "Potatoes", "Green Peas", "Cumin", "Chaat Masala"],
      steps: [
        "Prepare dough for the samosa crust.",
        "Make potato filling with spices and peas.",
        "Fill, fold into a triangle, and deep fry until crispy.",
        "Serve with chutney."
      ],
    },
    {
      id: 9,
      title: "Gulab Jamun",
      description: "Soft and juicy deep-fried dumplings soaked in sugar syrup.",
      image: "https://media.istockphoto.com/id/1194662949/photo/indian-dessert-or-sweet-dish-gulab-jamun-in-white-bowl-on-yellow-background.jpg?s=612x612&w=0&k=20&c=XAOQkQC-Mu-XXviGtWU6NTz8vZzT1sY0oaJQ4jWo2Fo=",
      category: "Dessert",
      ingredients: ["Milk Powder", "Flour", "Sugar", "Cardamom", "Ghee"],
      steps: [
        "Prepare dough with milk powder and flour.",
        "Shape into small balls and deep fry until golden brown.",
        "Soak in warm sugar syrup with cardamom.",
        "Serve warm or chilled."
      ],
    },
    {
      id: 10,
      title: "Dhokla",
      description: "A soft and spongy steamed gram flour cake.",
      image: "https://static.vecteezy.com/system/resources/previews/035/249/353/non_2x/indian-traditional-street-food-khaman-dhokla-photo.jpg",
      category: "Snack",
      ingredients: ["Gram Flour", "Yogurt", "Eno", "Turmeric", "Curry Leaves"],
      steps: [
        "Mix gram flour, yogurt, turmeric, and eno.",
        "Steam until fluffy and soft.",
        "Prepare tempering with mustard seeds and curry leaves.",
        "Pour over dhokla and serve."
      ],
    }
  ];
  export default function RecipePage() {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [likedRecipes, setLikedRecipes] = useState({});

    const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredRecipes = recipesData.filter(
    (recipe) =>
      (category === "All" || recipe.category === category) &&
      recipe.title.toLowerCase().includes(search.toLowerCase())
  );

    const toggleLike = (id) => {
        setLikedRecipes((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
      <div> <Navbar />
        <div className="bg-gray-50 text-gray-900 p-6">
           {/* Page Header */}
      <h1 className="text-4xl font-bold text-center text-gray-900">Discover Recipes</h1>
      <p className="text-center text-gray-600 mt-2">Find the best recipes curated for you</p>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-6 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search recipes..."
          className="p-3 w-full md:w-1/3 border rounded-lg focus:ring-orange-500 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-3 border rounded-lg focus:ring-orange-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Main Course">Main Course</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Snack">Snack</option>
          <option value="Dessert">Desserts</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
                    <div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                        <img className="w-full h-60 object-cover" src={recipe.image} alt={recipe.title} />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{recipe.title}</h3>
                            <p className="text-gray-600 mt-2">{recipe.description}</p>

                            <div className="flex items-center mt-4">
                                {/* View Recipe Button */}
                                <button
                                    className="px-5 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all"
                                    onClick={() => setSelectedRecipe(recipe)}
                                >
                                    View Recipe
                                </button>

                                {/* Like Button */}
                                <button
                                    className={`ml-4 p-2 rounded-full transition-all duration-300 ${
                                        likedRecipes[recipe.id] ? "text-red-500 scale-110" : "text-gray-500 hover:text-red-500"
                                    }`}
                                    onClick={() => toggleLike(recipe.id)}
                                >
                                    <Heart
                                        fill={likedRecipes[recipe.id] ? "currentColor" : "none"}
                                        size={30}
                                        strokeWidth={2}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                ))) : (
                  <p className="text-center text-gray-500 col-span-full">No recipes found</p>
                )}
            </div>

            {/* Recipe Details Modal */}
            {selectedRecipe && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold">{selectedRecipe.title}</h2>
                        <img className="w-full h-60 object-cover mt-4" src={selectedRecipe.image} alt={selectedRecipe.title} />
                        <h3 className="mt-4 font-semibold text-lg">Ingredients:</h3>
                        <p className="text-gray-700">{selectedRecipe.ingredients.join(", ")}</p>
                        <h3 className="mt-4 font-semibold text-lg">Steps:</h3>
                        <ol className="list-decimal pl-5 mt-2 text-gray-700">
                            {selectedRecipe.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                            onClick={() => setSelectedRecipe(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
<Footer />
        </div>
    );
}