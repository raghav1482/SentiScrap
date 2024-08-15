import React from 'react';
import { useLocation } from 'react-router-dom';
import './profile.css'; // Import CSS for styling
import Navbar from './Navbar';

const Profile = () => {
    const location = useLocation();
    const user = location.state.user;
    const displayName = user?.displayName || "Anonymous";
    const userLocation = user?.location || "Location not provided";
    const occupation = user?.occupation || "Occupation not provided";
    const education = user?.education || "Education not provided";
    const friendsCount = user?.friendsCount || 0;
    const photosCount = user?.photosCount || 0;
    const commentsCount = user?.commentsCount || 0;
    const photoURL = user?.photoURL || "default-profile-pic.jpg";

    return (
        <div className="m-container">
            <Navbar onSearch={()=>{}} search_hide="true"/>
            <div className="main-box">
            <div className="profile-card">
                <div className="profile-header">
                    <img className="profile-picture" src={photoURL} alt="Profile" />
                    <h2 className="profile-name">{displayName}</h2>
                    <p className="profile-location">{userLocation}</p>
                </div>
                <div className="profile-details">
                    <p className="profile-occupation">{occupation}</p>
                    <p className="profile-education">{education}</p>
                </div>
                <div className="profile-stats">
                    <div className="stats-item">
                        <strong>{friendsCount}</strong>
                        <span>Friends</span>
                    </div>
                    <div className="stats-item">
                        <strong>{photosCount}</strong>
                        <span>Photos</span>
                    </div>
                    <div className="stats-item">
                        <strong>{commentsCount}</strong>
                        <span>Comments</span>
                    </div>
                </div>
                <div className="profile-actions">
                    <button className="btn-connect">Connect</button>
                    <button className="btn-message">Message</button>
                </div>
                <div className="profile-location-info">
                    <p><strong>Current URL:</strong> {location.pathname}</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;
