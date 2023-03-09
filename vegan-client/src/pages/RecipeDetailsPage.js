import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
const API_URL = process.env.REACT_APP_API_URL;

const RecipeDetailsPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/recipe/${recipeId}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [recipeId]);

  return (
    <div>
      <Navbar />
      <div>
        <div className="RecipeDetails">
          {recipe && (
            <>
              <img src={recipe.imageUrl} alt="recipe-image" />
              <h2>{recipe.title}</h2>
              <p>{recipe.ingredients}</p>
              <p>{recipe.instructions}</p>
              <p>Allergies:</p>
              <ul>
                {recipe.allergies.gluten && <li>Gluten</li>}
                {recipe.allergies.soy && <li>Soy</li>}
                {recipe.allergies.peanut && <li>Peanut</li>}
                {recipe.allergies.almond && <li>Almond</li>}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
