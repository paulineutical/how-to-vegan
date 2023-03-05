import React from 'react';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";


const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();
    
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value); 
    const handlePassword2 = (e) => setPassword2(e.target.value); 
    // hier irgendwo kommt der Vergleich, ob Passwort1 mit Passwort2 übereinstimmt
    const handleName = (e) => setName(e.target.value);

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the request body
        if(password !== password2){
            setErrorMessage("Passwords are not equal.")
            return 
        }
        const requestBody = { email, password, password2, name };

        axios.post(`${API_URL}/auth/signup`, requestBody)
        .then((response) => {
            navigate('/login');
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        })
        };

    return (
        <div className="SignupPage">
            <h1>Sign Up</h1>
        
            <form onSubmit={handleSignupSubmit}>
                <label>Email:</label>
                <input 
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                />
        
                <label>Password:</label>
                <input 
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                />

                <label>Repeat your password:</label>
                <input 
                type="password"
                name="password"
                value={password2}
                onChange={handlePassword2}
                />
                {password === password2 ? <>✅</> : <>❌</>}
        
                <label>Name:</label>
                <input 
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                />
        
                <button type="submit">Sign Up</button>
            </form>

            { errorMessage && <p className="error-message">{errorMessage}</p> }
 
            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
        </div>
    );
}


export default SignupPage;