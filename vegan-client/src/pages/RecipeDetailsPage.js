import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';

const RecipeDetailsPage = (props) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);


  // axios.get("http://localhost:5005/recipe/{recipeId}")
  // .then((apiResponse) => {
      // setRecipe(apiResponse.data);
  // });


    return (
        <div>
      <Navbar />
      <div>
          <div className="RecipeCard">
            <img src={recipe.imageUrl} alt="recipe-image" />
            <h2>{recipe.title}</h2>
            <p>{recipe.ingredients}</p>
            <p>{recipe.instructions}</p>
            <p>{recipe.allergies}</p>
          </div>
      </div>
    </div>
    );
};

export default RecipeDetailsPage;