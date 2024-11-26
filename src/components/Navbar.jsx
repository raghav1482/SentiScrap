import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Import the auth instance from firebase.js
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Profile from './Profile'; // Your Profile component
import SignIn from './SignIn'; // Your SignIn component

export default function Navbar({ onSearch, search_hide, setHistory,toggleTheme }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isInputVisible, setInputVisible] = useState(false);
    const [isNavVisible, setNavVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [isSignInModalOpen, setSignInModalOpen] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const probability = Math.random(); // Example probability calculation
        const searchItem = { url: searchQuery, probability };
        onSearch(searchQuery);

        setInputVisible(false);
    };

    const handleSearchClick = () => {
        if (isInputVisible) {
            document.querySelector('form').requestSubmit();
        } else {
            setInputVisible(true);
        }
    };

    const handleToggleClick = () => {
        setNavVisible(!isNavVisible);
    };

    const handleProfileClick = () => {
        if (user) {
            navigate('/profile', { state: { user: { displayName: user.displayName, email: user.email, photoURL: user.photoURL } } });
        } else {
            setSignInModalOpen(true);
        }
    };

    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user);
                setSignInModalOpen(false);
                navigate('/profile', { state: { user: { displayName: user.displayName, email: user.email, photoURL: user.photoURL } } });
            })
            .catch((error) => {
                console.error("Error during sign-in", error);
            });
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                navigate('/'); // Redirect to home or another page after logout
            })
            .catch((error) => {
                console.error("Error during sign-out", error);
            });
    };

    return (
        <>
            <div className="Navbar">
                <div>
                    <Tooltip id="tooltip-lastfm" content="Go to LastFM" />
                    <button
                        className="btn-circle"
                        aria-label="Go to LastFM"
                        data-tooltip-id="tooltip-lastfm"
                        onClick={() => { navigate("/") }}
                    >
                        <i className="fa fa-lastfm"></i>
                    </button>

                    {!search_hide && (
                        <form onSubmit={handleSearchSubmit} style={{ display: "inline-block" }}>
                            <Tooltip id="tooltip-search" content={isInputVisible ? "Submit Search" : "Show Search Input"} />
                            <button
                                type="button"
                                className="btn-circle"
                                onClick={handleSearchClick}
                                aria-label="Toggle or Submit Search Input"
                                data-tooltip-id="tooltip-search"
                            >
                                <i className="fa fa-search"></i>
                            </button>
                            {isInputVisible && (
                                <>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        placeholder="Enter review URL..."
                                        className="search-input"
                                    />
                                </>
                            )}
                        </form>
                    )}
                </div>

                <div>
                    <Tooltip id="tooltip-dashboard" content="Dashboard" />
                    <button
                        className="btn-black"
                        data-tooltip-id="tooltip-dashboard"
                    >
                        <i className="fa fa-tasks"></i>
                    </button>

                    <Tooltip id="tooltip-adjust" content="Adjust" />
                    <button
                        className="btn-white"
                        data-tooltip-id="tooltip-adjust"
                        onClick={toggleTheme}
                    >
                        <i className="fa fa-adjust"></i>
                    </button>

                    <Tooltip id="tooltip-user" content="User Profile" />
                    <button
                        className="btn-white"
                        data-tooltip-id="tooltip-user"
                        onClick={handleProfileClick}
                    >
                        <i className="fa fa-user"></i>
                    </button>


                    {user && (
                        <>
                            <Tooltip id="tooltip-logout" content="Logout" />
                            <button
                                className="btn-white"
                                data-tooltip-id="tooltip-logout"
                                onClick={handleLogout}
                            >
                                <i className="fa fa-sign-out"></i>
                            </button>
                        </>
                    )}
                </div>

                <div>
                    <Tooltip id="tooltip-profile" content="Profile" />
                    <button className="btn-white" style={{ padding: "5px" }} data-tooltip-id="tooltip-profile" onClick={handleProfileClick}>
                        {user ? (
                            <>
                                <img className="profile" src={user.photoURL} alt="Profile" />
                                {user.displayName}
                            </>
                        ) : (
                            <>
                                <img className="profile" src="https://via.placeholder.com/100" alt="Profile" />
                                Guest
                            </>
                        )}
                        <i className="fa fa-check mx-3" style={{ color: "green" }}></i>
                    </button>
                </div>
            </div>

            <div className="Navbar-mob">
                {!search_hide && (
                    <form onSubmit={handleSearchSubmit} style={{ display: "inline-block", marginRight: "auto" }}>
                        <Tooltip id="tooltip-search" content={isInputVisible ? "Submit Search" : "Show Search Input"} />
                        <button
                            type="button"
                            className="btn-circle"
                            onClick={handleSearchClick}
                            aria-label="Toggle or Submit Search Input"
                            data-tooltip-id="tooltip-search"
                        >
                            <i className="fa fa-search"></i>
                        </button>
                        {isInputVisible && (
                            <>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Enter review URL..."
                                    className="search-input"
                                />
                            </>
                        )}
                    </form>
                )}

                <button className="toggle-button" onClick={handleToggleClick}>
                    <i className="fa fa-bars"></i>
                </button>

                <div className={`nav-items ${isNavVisible ? 'visible' : ''}`}>
                    <button className="btn-white nav-item" style={{ padding: "5px", background: "none", boxShadow: "none" }} data-tooltip-id="tooltip-profile" onClick={handleProfileClick}>
                        {user ? (
                            <>
                                <img className="profile" src={user.photoURL} alt="Profile" />
                                {user.displayName}
                            </>
                        ) : (
                            <>
                                <img className="profile" src="https://via.placeholder.com/100" alt="Profile" />
                                Guest
                            </>
                        )}
                    </button>
                    <button className="btn-white nav-item" style={{ padding: "5px", background: "none", boxShadow: "none" }}>History</button>
                    <button className="btn-white nav-item" style={{ padding: "5px", background: "none", boxShadow: "none" }}>About</button>
                    <button className="btn-white nav-item" style={{ padding: "5px", background: "none", boxShadow: "none" }}>Dashboard</button>
                    {user && (
                        <button className="btn-black nav-item" style={{ padding: "5px", boxShadow: "none" }} onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </div>
            <div style={{ width: "100%" }}>
                <SignIn isOpen={isSignInModalOpen} toggle={() => setSignInModalOpen(!isSignInModalOpen)} onSignIn={handleSignIn} />
            </div>
        </>
    );
}
