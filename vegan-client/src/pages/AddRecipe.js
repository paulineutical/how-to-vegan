import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"


const AddRecipe = () => {
    const [title, setTitle] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instruction, setInstruction] = useState("")

    const navigate = useNavigate()

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const requestBody = { title, ingredients, instruction }
    
    axios.post("http://localhost:5005/api/recipe", requestBody)
      .then(response => {
        navigate("/recipes")
      })
      .catch(err => console.log(err))
  }

  const handleIngredientsChange = (e) => {
    setIngredients(e.target.value)
  }

  const handleInstructionChange = (e) => {
    console.log(e.target.value)
    setInstruction(e.target.value)
  }



    return (
        <div className="AddRecipe">
            <form onSubmit={handleSubmit}>
                <input name="title" type="text" value={title} onChange={handleTitleChange} />
                <input name="ingredients" type="text" value={ingredients} onChange={handleIngredientsChange} />
                <input name="instruction" type="text" value={instruction} onChange={handleInstructionChange} />
                <input type="submit" />
                {/* <input name="allergies" type="checkbox" onChange={(e) => handleAllergiesChange}/> */}
            </form>
        </div>
    );
};

export default AddRecipe;