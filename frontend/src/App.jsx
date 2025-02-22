import React from "react";
import Landingpage from "./components/Landingpage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Singup";
import Recipe from "./components/Recipe";
import RecipeCreation from "./components/RecipeCreation";
import UserDashboard from "./components/UserDashboard";
import {BrowserRouter as Router , Routes , Route } from "react-router-dom";
function App(){
  return(
    <div>
  <Router>
    <Navbar />
  <Routes>

    <Route path="/" element={<Landingpage  />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/recipe" element={<Recipe />} />
    <Route path="/recipecreation" element={<RecipeCreation />} />
  </Routes>
  <Footer />
</Router>
    </div>
  );
}
export default App;