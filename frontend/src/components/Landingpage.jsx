import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Cherry, Menu, X, Users, BookOpen, Clock, Award, ChefHat, Heart, Share2, Search, ArrowRight, Play } from 'lucide-react';

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();

  // --- NEW: State to hold the logged-in user's data ---
  const [user, setUser] = useState(null);

  // --- NEW: Fetch user data on component mount ---
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // No token found, user is not logged in
        return;
      }

      try {
        // Use the VITE_BASE_URL from your .env file
        const apiBaseUrl = import.meta.env.VITE_BASE_URL;
        const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Token is invalid or expired, clear it
          localStorage.removeItem("token");
          localStorage.removeItem("user"); // Also remove user data
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };

    fetchUser();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonial timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []); // Note: testimonials is static, so this is okay

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // --- All static data remains unchanged ---
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <div className="flex items-center text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} fill="currentColor" stroke="none" className="w-4 h-4" />
        ))}
        {halfStar && <Star fill="currentColor" stroke="none" className="w-4 h-4 opacity-50" />}
        <span className="ml-2 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  const trendingRecipes = [
    { id: 1, title: "Truffle Risotto", description: "Luxurious Italian risotto...", image: "...", rating: 4.9, cookTime: "45 min", difficulty: "Advanced", chef: "Marco Rossi" },
    { id: 2, title: "Avocado Toast Supreme", description: "Gourmet avocado toast...", image: "...", rating: 4.7, cookTime: "15 min", difficulty: "Easy", chef: "Sarah Chen" },
    { id: 3, title: "Berry Acai Bowl", description: "Antioxidant-rich smoothie bowl...", image: "...", rating: 4.8, cookTime: "10 min", difficulty: "Easy", chef: "Emma Wilson" },
    { id: 4, title: "Wagyu Steak", description: "Premium wagyu steak...", image: "...", rating: 4.9, cookTime: "30 min", difficulty: "Advanced", chef: "David Kim" }
  ];

  const features = [
    { icon: <Users className="w-6 h-6 md:w-8 md:h-8" />, title: "Join Community", description: "Connect with passionate chefs...", step: "01" },
    { icon: <BookOpen className="w-6 h-6 md:w-8 md:h-8" />, title: "Share Recipes", description: "Upload your favorite recipes...", step: "02" },
    { icon: <Search className="w-6 h-6 md:w-8 md:h-8" />, title: "Discover & Save", description: "Find amazing recipes and save them...", step: "03" },
    { icon: <ChefHat className="w-6 h-6 md:w-8 md:h-8" />, title: "Cook & Connect", description: "Try new recipes and share...", step: "04" }
  ];

  const stats = [
    { number: "50K+", label: "Active Chefs" },
    { number: "100K+", label: "Recipes Shared" },
    { number: "1M+", label: "Happy Cooks" },
    { number: "4.9★", label: "App Rating" }
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "Home Chef", content: "LushBites transformed my cooking journey...", image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 5 },
    { name: "Marcus Rodriguez", role: "Food Blogger", content: "As a food blogger, I love how easy it is to share...", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 5 },
    { name: "Emily Johnson", role: "Professional Chef", content: "The quality of recipes and the attention to detail...", image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* --- UPDATED NAVIGATION --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className={`flex items-center gap-2 md:gap-3 transition-all duration-300 ${scrollY > 50 ? 'text-gray-900' : 'text-white'}`}>
              <div className="relative">
                <Cherry size={28} strokeWidth={1.5} className="md:w-8 md:h-8 transform hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-lg md:text-xl font-bold">
                <span className="italic">Lush</span>
                <span className="font-black">Bites</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {['Trending', 'How it Works', 'Community', 'Reviews'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={`font-medium transition-all duration-300 hover:text-emerald-500 relative group ${scrollY > 50 ? 'text-gray-700' : 'text-white'}`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              
              {/* --- CONDITIONAL UI: Renders Profile Icon or "Get Started" button --- */}
              {user ? (
                <button
                  onClick={() => navigate('/userprofile')}
                  className="bg-emerald-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg shadow-md border-2 border-white/50 hover:scale-110 transition-transform"
                  aria-label="View Profile"
                >
                  {user.name?.charAt(0).toUpperCase()}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-emerald-500 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full hover:bg-emerald-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25 text-sm md:text-base font-medium"
                >
                  Get Started
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden p-2 transition-colors duration-300 ${scrollY > 50 ? 'text-gray-900' : 'text-white'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu with conditional UI */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="px-4 sm:px-6 py-4 space-y-4">
              {['Trending', 'How it Works', 'Community', 'Reviews'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="block text-gray-700 font-medium hover:text-emerald-500 transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
              
              {/* --- CONDITIONAL UI FOR MOBILE --- */}
              {user ? (
                <button
                  onClick={() => { navigate('/userprofile'); setIsMenuOpen(false); }}
                  className="w-full bg-emerald-500 text-white py-3 rounded-full hover:bg-emerald-600 transition-all duration-300 font-medium"
                >
                  Go to Profile
                </button>
              ) : (
                <button
                  onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}
                  className="w-full bg-emerald-500 text-white py-3 rounded-full hover:bg-emerald-600 transition-all duration-300 font-medium"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              Discover, Share &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400"> Cook Amazing</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Join our passionate community of food lovers and discover thousands of amazing recipes from around the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <button 
                onClick={()=>navigate('/login')}
                className="w-full sm:w-auto bg-emerald-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-emerald-600 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-emerald-500/25 flex items-center justify-center gap-2">
                <ChefHat size={20} />
                Start Cooking Now
              </button>
              <button className="w-full sm:w-auto border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Play size={18} />
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-16 md:top-20 left-4 md:left-10 w-12 h-12 md:w-20 md:h-20 bg-emerald-500/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-32 md:top-40 right-8 md:right-20 w-8 h-8 md:w-12 md:h-12 bg-yellow-400/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 md:bottom-20 left-8 md:left-20 w-10 h-10 md:w-16 md:h-16 bg-pink-500/20 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-100">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">{stat.number}</div>
                  <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Recipes */}
      <section id="trending" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Trending <span className="text-emerald-500">Recipes</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Discover the most popular recipes loved by our community of chefs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {trendingRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden group border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-40 sm:h-48 md:h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/90 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium text-gray-700">
                    {recipe.difficulty}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm">{recipe.cookTime}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 md:top-4 left-3 md:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition-colors duration-300">
                      <Heart size={14} className="md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base line-clamp-2">{recipe.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <StarRating rating={recipe.rating} />
                    <span className="text-xs md:text-sm text-gray-500">by {recipe.chef}</span>
                  </div>
                  <button className="w-full bg-emerald-50 text-emerald-600 py-2 md:py-3 rounded-lg hover:bg-emerald-100 transition-all duration-300 font-medium text-sm md:text-base flex items-center justify-center gap-2 group">
                    View Recipe
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-20 bg-gradient-to-br from-emerald-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              How It <span className="text-emerald-500">Works</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Get started with LushBites in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group border border-gray-100"
              >
                <div className="absolute -top-3 md:-top-4 left-6 md:left-8 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold shadow-lg">
                  {feature.step}
                </div>
                <div className="text-emerald-500 mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">{feature.description}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight size={20} className="text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              What Our <span className="text-emerald-500">Community</span> Says
            </h2>
            <p className="text-lg md:text-xl text-gray-600 px-4">
              Real stories from real food lovers
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-500 to-yellow-400 p-1 rounded-2xl md:rounded-3xl shadow-2xl">
              <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-emerald-200 shadow-lg"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-gray-700 text-base md:text-lg mb-4 italic leading-relaxed">
                      "{testimonials[currentTestimonial].content}"
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <StarRating rating={testimonials[currentTestimonial].rating} />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-emerald-600 font-medium">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Dots */}
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? 'bg-emerald-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-emerald-600 to-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full opacity-10 animate-bounce"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Ready to Start Your Culinary Journey?
          </h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Join thousands of home chefs who are already sharing, discovering, and cooking amazing recipes every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button 
            onClick={()=>navigate('/signup')}
            className="w-full sm:w-auto bg-white text-emerald-600 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
              <ChefHat size={20} />
              Join Free Today
            </button>
            <button 
            onClick={()=>navigate('/login')}
            className="w-full sm:w-auto border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              <Share2 size={20} />
              Share a Recipe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Cherry size={32} strokeWidth={1.5} className="text-emerald-500" />
                <div className="text-xl font-bold">
                  <span className="italic">Lush</span>
                  <span className="font-black">Bites</span>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Bringing food lovers together through the art of cooking and sharing.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300 cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300 cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300 cursor-pointer">
                  <span className="text-sm font-bold">i</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-emerald-500 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  About Us
                </a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  How It Works
                </a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  Trending
                </a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  Community
                </a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-emerald-500 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  Help Center
                </a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  Contact Us
                </a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  Privacy Policy
                </a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  Terms of Service
                </a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-4 text-sm md:text-base">
                Get the latest recipes and community news delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-all duration-300 hover:scale-105 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400">
            <p className="text-sm md:text-base">&copy; 2025 LushBites. All rights reserved. Made with ❤️ for food lovers everywhere.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;