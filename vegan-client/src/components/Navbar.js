import React from 'react';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

 

const Navbar = () => {
    const {isLoggedIn, user, logOutUser} = useContext(AuthContext)
    return (
        <nav>
            <Link to="/"><button>Home</button></Link>
            { isLoggedIn && (
                <>
                    <Link to="/">
                    {/* nachher wenn Model kreiert: <Link to="/myprofile" oder "/" */}
                        <button>My Profile</button>
                    </Link>
                    <button onClick={logOutUser}>Logout</button>
                    <span>{user && user.name}</span>
                </>
            )}

            {!isLoggedIn && (
                <>
                    <Link to="/signup"> <button>Sign up</button></Link>
                    <Link to="/login"> <button>Log in</button></Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;