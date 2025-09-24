import React, { useState } from "react";
import Landingpage from "./components/Landingpage";
import Login from "./components/Login";
import Signup from "./components/Singup";
import Recipe from "./components/Recipe";
import RecipeCreation from "./components/RecipeCreation";
import UserDashboard from "./components/UserDashboard";
import {BrowserRouter as Router , Routes , Route } from "react-router-dom";
import MyRecipes from "./components/MyRecipe";
import UserProfile from "./components/UserProfile";
import RecipeDetail from "./components/RecipeDetails";
import ScrollToTop from "./components/ScrollToTop";

function App(){
  const [userData,setUserData] = useState([]);

  return(
    <div>

  <Router>
    <ScrollToTop />
  <Routes>
    <Route path="/" element={<Landingpage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup setUserData={setUserData}/>} />
    <Route path="/recipe" element={<Recipe />} />
    <Route path="/recipe/:id" element={<RecipeDetail />} />
    <Route path="/recipecreation" element={<RecipeCreation />} />
    <Route path="/userdashboard" element={<UserDashboard />} />
    <Route path="/myrecipe" element={<MyRecipes />} />
    <Route path="/userprofile" element={<UserProfile data={userData} />} />
  </Routes>
</Router>
    </div>
  );
}
export default App;