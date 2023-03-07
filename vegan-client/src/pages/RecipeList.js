import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const RecipeList = (props) => {
    const navigate = useNavigate();

  return (
    <div>
      <Link to="/add-recipe">
        <button>Add a recipe</button>
      </Link>
      <div>
        {props.recipes.map((recipe) => {
          return (
            <Link to={`/recipes/${recipe._id}`}>
            <div className="RecipeCard">
              <img src={recipe.imageUrl} alt="recipe-image" />
              <h2>{recipe.title}</h2>
            </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeList;
