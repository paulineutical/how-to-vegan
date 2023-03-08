import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const ProfilePage = () => {
    const { user } = useContext(AuthContext)

    return (
        <div>
            
        </div>
    );
};

export default ProfilePage;