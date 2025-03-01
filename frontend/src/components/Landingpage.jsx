import React, { useState } from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Cherry } from 'lucide-react';
import Footer from "./Footer.jsx"
function Landingpage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0; // Check for half star
    return (
      <div className="flex items-center text-yellow-500">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} fill="currentColor" stroke="none" className="w-7 h-7" />
        ))}
        {halfStar && <Star fill="currentColor" stroke="none" className="w-7 h-7 opacity-50" />}
      </div>
    );
  };

  function handleLogin() {
    navigate("/login");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const trendingRecipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta with creamy sauce and crispy pancetta.",
      image: "https://content.jwplatform.com/thumbs/KcRLmhDx-720.jpg",
      rating: 4.8
    },
    {
      id: 2,
      title: "Avocado Toast",
      description: "Healthy and delicious avocado spread on toasted sourdough.",
      image: "https://media.istockphoto.com/id/1139597774/photo/toast-with-mashed-avocado-arugula.jpg?s=612x612&w=0&k=20&c=MXJpDlUCAMVnHCIuO6d4uq8iRXrJXegAYkGeuoTd5Wc=",
      rating: 4.6
    },
    {
      id: 3,
      title: "Berry Smoothie Bowl",
      description: "Refreshing smoothie bowl topped with berries and granola.",
      image: "https://poshplate.us/wp-content/uploads/2023/07/Strawberry-Smoothie-Bowl-Recipe.jpg",
      rating: 4.7
    }
  ];
  return (
    <div>
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center fixed w-full">
        {/* Logo / Name */}
        <div className="text-2xl font-bold flex items-center gap-5 ml-5 hover:text-emerald-500 cursor-pointer">
          <Cherry size={50} strokeWidth={1.5} />
          <p>
            <i>Lush</i> <strong>Bites</strong>
          </p>
        </div>

        {/* Burger Menu (Mobile) */}
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white"></div>
        </div>

        {/* Navigation Links */}
        <ul
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent md:flex gap-6 text-lg transition-all duration-300 ease-in-out ${isMenuOpen ? "flex flex-col items-center py-2" : "hidden md:flex"
            }`}
        >
          <li><a href="#trending" className=" hover:text-emerald-500">Trending recipes</a></li>
          <li><a href="#works" className=" hover:text-emerald-500">How it works</a></li>
          <li><a href="#reviews" className=" hover:text-emerald-500">Reviews</a></li>
          <li className="hidden md:block"><a href="/signup" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">Log In</a></li>
        </ul>
      </nav>


      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Hero Section */}
        <section className="text-center pb-10 pt-20 bg-cover bg-center pt-65 pb-65" style={{ backgroundImage: "url('https://thumbs.dreamstime.com/b/variety-colorful-tomatoes-flavoring-salad-ingredients-enamelled-bowls-tasty-summer-cooking-light-wooden-back-73763310.jpg')" }}>
          <h1 className="text-5xl font-bold text-black drop-shadow-lg">Discover, Share & Cook</h1>
          <p className="text-lg text-gray-500 mt-5">Join our community and explore thousands of amazing recipes</p>
          <button className="mt-10 px-12 py-6 bg-emerald-500 text-2xl text-white rounded-2xl shadow-md hover:bg-emerald-700 cursor-pointer" onClick={handleLogin}>Get Started</button>
        </section>

        {/* Trending Recipes */}
        <section className="py-20 px-6" id="trending">
          <h2 className="text-3xl font-semibold text-center mb-8">Trending Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingRecipes.map((recipe) => (
              <div key={recipe} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img className="w-full h-60 object-cover" src={recipe.image} alt="Recipe" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{recipe.title}</h3>
                  <p className="text-gray-600 mt-2 mb-2">{recipe.description}</p>
                  <StarRating rating={recipe.rating} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-emerald-100 py-20 px-6 text-center" id="works">
          <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Sign Up', 'Upload Recipes', 'Browse & Save', 'Cook & Connect'].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">{step}</h3>
                <p className="text-gray-600 mt-2">Step {index + 1} in the process.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <div className="reviews px-6 py-20 bg-gray-50 text-center" id="reviews">
          <h1 className="text-3xl items-center font-semibold text-gray-800 mb-8">What Our Users Says
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="user bg-white p-6 rounded-lg shadow-md">
              <p className="quotes bg-green-100 p-3 rounded-lg text-gray-700">
                "This app has completely transformed how I discover and cook new recipes. The step-by-step instructions are clear, and the rating system helps me find the best dishes quickly. Highly recommended!"
              </p>
              <div className="image rounded-lg flex flex-col items-center mt-4 p-3">
                <p className="font-semibold">Jayshree Parmar</p>
                <img
                  className="h-40 w-32 object-cover mt-2 rounded-lg"
                  src="https://freepngimg.com/save/29524-cooking-transparent-image/407x560"
                  alt="student-photo"
                />
              </div>
            </div>

            <div className="user bg-white p-6 rounded-lg shadow-md">
              <div className="image rounded-lg flex flex-col items-center p-3">
                <p className="font-semibold">Mehta Maitri</p>
                <img
                  className="h-40 w-32 object-cover mt-2 rounded-lg"
                  src="https://png.pngtree.com/png-vector/20240208/ourmid/pngtree-smiling-waitress-bring-meal-png-image_11719199.png"
                  alt="student-photo"
                />
              </div>
              <p className="quotes bg-green-100 p-3 rounded-lg text-gray-700 mt-4">
                "I love how easy it is to upload and share my own recipes! The interface is clean, and the search filters make finding the right recipe effortless. This is my go-to app for cooking inspiration."
              </p>
            </div>

            <div className="user bg-white p-6 rounded-lg shadow-md">
              <p className="quotes bg-green-100 p-3 rounded-lg text-gray-700">
                "Beyond just recipes, this platform connects me with fellow home chefs. I’ve learned so much from others’ tips and tricks. It feels like a supportive cooking family!"
              </p>
              <div className="image rounded-lg flex flex-col items-center mt-4 p-3">
                <p className="font-semibold">Jyotsana Anikar</p>
                <img
                  className="h-40 w-32 object-cover mt-2 rounded-lg"
                  src="https://png.pngtree.com/png-clipart/20240404/original/pngtree-a-beautiful-indian-woman-holding-plate-of-sweet-laddu-on-white-png-image_14747332.png"
                  alt="student-photo"
                />
              </div>
            </div>

            <div className="user bg-white p-6 rounded-lg shadow-md">
              <div className="image rounded-lg flex flex-col items-center p-3">
                <p className="font-semibold">Harsha Patel</p>
                <img
                  className="h-40 w-32 object-cover mt-2 rounded-lg"
                  src="https://www.globalagrocorp.com/assets/img/shutterstock_296555528.png"
                  alt="student-photo"
                />
              </div>
              <p className="quotes bg-green-100 p-3 rounded-lg text-gray-700 mt-4">
                "The app is fast, well-organized, and constantly updated with trending recipes. I appreciate the ingredient substitutions feature, which helps me cook with what I have at home."
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <section className="bg-emerald-400 text-white text-center py-16 ">
          <h2 className="text-3xl font-bold">Start Cooking & Sharing Today!</h2>
          <button className="mt-5 px-6 py-3 bg-white text-emerald-500 rounded-lg shadow-md hover:bg-gray-150 cursor-pointer" onClick={handleLogin}>Join Now</button>
        </section>



      </div>
      <Footer />
    </div>

  );
}
export default Landingpage;