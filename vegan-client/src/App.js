import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios"

import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";

import SignupPage from "./pages/SignupPage"; 
import LoginPage from "./pages/LoginPage";

import AddRecipe from "./pages/AddRecipe";
import RecipeList from './pages/RecipeList';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import ProfilePage from './pages/ProfilePage';

const API_URL = process.env.REACT_APP_API_URL

function App() {
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  
  const getRecipes = () => {
    axios.get(`${API_URL}/api/recipes`)
      .then(response => {
        console.log(response)
        setRecipes(response.data)
      })
      .catch(err => console.log(err))
  }

  const filterRecipes = (allergy) => {
    if ( allergy === "none" ) {
      setFilteredRecipes(recipes)
    } else  {
      const recipeFilteredByAllergy = recipes.filter(recipe => {
        return recipe.allergy === allergy
      })
      setFilteredRecipes(recipeFilteredByAllergy)
    }
  }

  useEffect(() => {
    getRecipes() 
  },[])



  return (
    <div>
      <Navbar/>
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/signup" element={ <SignupPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/recipes" element={ <RecipeList recipes={recipes} /> } />
        <Route path="/add-recipe" element={ <AddRecipe /> } />
        <Route path="/recipes/:recipeId" element={ <RecipeDetailsPage /> } />
        <Route path="/myprofile" element={ <ProfilePage /> } />
      </Routes>
    </div>
  );
}

export default App;
