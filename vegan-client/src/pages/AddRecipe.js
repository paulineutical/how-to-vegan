import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"


const AddRecipe = () => {
    const [title, setTitle] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instructions, setinstructions] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [gluten, setGluten] = useState(false)
    const [soy, setSoy] = useState(false)
    const [peanut, setPeanut] = useState(false)
    const [almond, setAlmond] = useState(false) 


    const navigate = useNavigate()

    const handleTitleChange = (e) => {
      setTitle(e.target.value)
    }

    const handleIngredientsChange = (e) => {
      setIngredients(e.target.value)
    }

    const handleinstructionsChange = (e) => {
      setinstructions(e.target.value)
    }

    const handleAllergiesChange = (e) => {
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      switch (name) {
        case "gluten": {
          setGluten(value);
          break;
        }
        case "soy": {
          setSoy(value);
          break;
        }
        case "peanut": {
          setPeanut(value);
          break;
        }
        case "almond": {
          setAlmond(value);
          break;
        }
        default: console.error("Unhandled allergy: " + name)
      }

    }

    const handleFileUpload = (e) => {
      const uploadData = new FormData();
      console.log("funktioniert handleFileUpload?!?!?!!?")
  
      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new movie in '/api/movies' POST route
      uploadData.append("imageUrl", e.target.files[0]);
  
      axios.post("http://localhost:5005/api/upload", uploadData)
        .then(response => {
          console.log("response ImageUrl is: ", response);
          // response carries "fileUrl" which we can use to update the state
          setImageUrl(response.data.imageUrl);
        })
        .catch(err => console.log("Error while uploading the file: ", err));
    };

    const handleSubmit = (e) => {
      e.preventDefault()

      const requestBody = { title, imageUrl, ingredients, instructions, allergies: {gluten, soy, peanut, almond} }
      console.log(requestBody)
      
      axios.post("http://localhost:5005/api/recipe", requestBody)
        .then(() => {
          navigate("/recipes")
        })
        .catch(err => console.log(err))
    }


    return (
        <div className="AddRecipe">
            <form onSubmit={handleSubmit}>
                <label for="title">Title: </label>
                <input id="title" name="title" type="text" value={title} onChange={handleTitleChange} />
                <label for="file">Upload an image for your recipe here: </label>
                <input id="file" type="file" onChange={handleFileUpload} />
                <label for="ingredients">Ingredients: </label>
                <textarea id="ingredients" name="ingredients" type="text" value={ingredients} onChange={handleIngredientsChange} />
                <label for="instructions">Instructions: </label>
                <textarea id="instructions" name="instructions" type="text" value={instructions} onChange={handleinstructionsChange} />
                <ul>
                  <label for="allergies">Please select the following ingredients, if your recipe contains one or more: </label>
                  <li className="checkbox">
                  <input name="gluten" type="checkbox" onChange={handleAllergiesChange}/>
                  <label for="gluten">Gluten</label>
                  </li>
                  <li className="checkbox">
                  <input name="soy" type="checkbox" onChange={handleAllergiesChange}/>
                  <label for="soy">Soy</label>
                  </li>
                  <li className="checkbox">
                  <input name="peanut" type="checkbox" onChange={handleAllergiesChange}/>
                  <label for="peanut">Peanut</label>
                  </li>
                  <li className="checkbox">
                  <input name="almond" type="checkbox" onChange={handleAllergiesChange}/>
                  <label for="almond">Almond</label>
                  </li>
                </ul>
                <button class="button-83" role="button" type="submit">Add your vegan recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;