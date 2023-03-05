import React from 'react';
import { Link } from "react-router-dom";


const RecipeList = () => {
    return (
        <div>
            <Link to="/add-recipe"><button>Add a recipe</button></Link>
        </div>
    );
};

export default RecipeList;
