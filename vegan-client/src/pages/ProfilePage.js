import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  const [gluten, setGluten] = useState(false);
  const [soy, setSoy] = useState(false);
  const [peanut, setPeanut] = useState(false);
  const [almond, setAlmond] = useState(false);
  const [image, setImage] = useState();
  console.log("!!!!" , image)

  const navigate = useNavigate();

  const handleAllergiesChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
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
      default:
        console.error("Unhandled allergy: " + name);
    }
  };

  const handleAllergySubmit = (e) => {
    e.preventDefault();
    const requestBody = { allergies: { gluten, soy, peanut, almond } };
    console.log(requestBody);

    axios
      .post(`${API_URL}/api/recipe`, requestBody)
      .then(() => {
        navigate("/recipes");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (authContext.user == null) {
      return;
    }
    axios
      .get(`${API_URL}/api/user/`+ authContext.user._id)
      .then((response) => {
        setImage(response.data.image);
      });
  });

  

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    console.log("funktioniert handleFileUpload?!?!?!!?")

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    axios.post(`${API_URL}/api/upload`, uploadData)
      .then(response => {
        // response carries "fileUrl" which we can use to update the state
        axios.post(`${API_URL}/api/user/${authContext.user._id}/avatar`, {avatar: response.data.imageUrl})
        .then(()=> {
          console.log("HIER RESPONSE.DATA.IMAGEURL:", response.data.imageUrl)
          setImage(response.data.imageUrl);


        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  return (
    <div>
      <img id="profileImage" src={image} alt="profile image" />
      
        <input id="file" type="file" onChange={handleFileUpload} />
        
      <form onSubmit={handleAllergySubmit}>
        <ul>
          <label for="allergies">
            You can filter all recipes of this website by certain allergies you
            might have. If you select them here, you will see a warning for
            recipes containing them.{" "}
          </label>
          <li className="checkbox">
            <input
              name="gluten"
              type="checkbox"
              onChange={handleAllergiesChange}
            />
            <label for="gluten">Gluten</label>
          </li>
          <li className="checkbox">
            <input
              name="soy"
              type="checkbox"
              onChange={handleAllergiesChange}
            />
            <label for="soy">Soy</label>
          </li>
          <li className="checkbox">
            <input
              name="peanut"
              type="checkbox"
              onChange={handleAllergiesChange}
            />
            <label for="peanut">Peanut</label>
          </li>
          <li className="checkbox">
            <input
              name="almond"
              type="checkbox"
              onChange={handleAllergiesChange}
            />
            <label for="almond">Almond</label>
          </li>
        </ul>
        <button class="button-83" role="button" type="submit">
          Save your allergies.
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
