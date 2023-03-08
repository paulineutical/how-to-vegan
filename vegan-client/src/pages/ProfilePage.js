import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from 'react-router-dom';
import axios from "axios"



const ProfilePage = () => {
    const authContext  = useContext(AuthContext)
    const [gluten, setGluten] = useState(false)
    const [soy, setSoy] = useState(false)
    const [peanut, setPeanut] = useState(false)
    const [almond, setAlmond] = useState(false)
    const [image, setImage] = useState()

    const navigate = useNavigate()

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
  
      

    const handleSubmit = (e) => {
        e.preventDefault()
        const requestBody = { allergies: {gluten, soy, peanut, almond} }
        console.log(requestBody)
        

        axios.post("http://localhost:5005/api/recipe", requestBody)
          .then(() => {
            navigate("/recipes")
          })
          .catch(err => console.log(err))
        }
    
    useEffect(() => {
        if (authContext.user == null) {
            return;
        }
        axios.get("http://localhost:5005/api/user/" + authContext.user._id)
        .then ((response) => {
            setImage(response.data.image)
            
        })
    })

    return (
        <div>
            <img src={image} alt="profile image"/>
            <form onSubmit={handleSubmit}>
            <ul>
                <label for="allergies">You can filter all recipes of this website by certain allergies you might have. If you select them here, you will see a warning for recipes containing them.  </label>
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
                <button class="button-83" role="button" type="submit">Save your allergies.</button>
            </form>
        </div>
    );
}



export default ProfilePage;