import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"


const AddRecipe = () => {
    const [title, setTitle] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instructions, setinstructions] = useState("")

    const navigate = useNavigate()

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const requestBody = { title, ingredients, instructions }
    
    axios.post("http://localhost:5005/api/recipe", requestBody)
      .then(response => {
        navigate("/recipes")
      })
      .catch(err => console.log(err))
  }

  const handleIngredientsChange = (e) => {
    setIngredients(e.target.value)
  }

  const handleinstructionsChange = (e) => {
    console.log(e.target.value)
    setinstructions(e.target.value)
  }



    return (
        <div className="AddRecipe">
            <form onSubmit={handleSubmit}>
                <textarea name="title" type="text" value={title} onChange={handleTitleChange} />
                <input name="ingredients" type="text" value={ingredients} onChange={handleIngredientsChange} />
                <input name="instructions" type="text" value={instructions} onChange={handleinstructionsChange} />
                <input type="submit" />
                {/* <input name="allergies" type="checkbox" onChange={(e) => handleAllergiesChange}/> */}
            </form>
        </div>
    );
};

export default AddRecipe;