import React from 'react';
import { useLocation } from 'react-router-dom';
import './profile.css'; // Import CSS for styling
import Navbar from './Navbar';

const Profile = () => {
    const location = useLocation();
    const user = location.state.user;
    const displayName = user?.displayName || "Anonymous";
    const email = user?.email || "Occupation not provided";
    const photoURL = user?.photoURL || "default-profile-pic.jpg";
    return (
        <div className="m-container">
            <Navbar onSearch={()=>{}} search_hide="true"/>
            <div className="main-box">
            <div className="profile-card">
                <div className="profile-header">
                    <img className="profile-picture" src={photoURL} alt="Profile" />
                    <h2 className="profile-name">{displayName}</h2>
                </div>
                <div className="profile-details">
                    <p className="profile-occupation">{email}</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;
