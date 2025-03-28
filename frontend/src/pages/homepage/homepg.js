import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./homepg.css";
import logo from "../components/media/Bean and Brew.png";
import croissant from "../components/media/pexels-valeriiamiller-2974486.jpg";

const HomePg = ({ user }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Logout function
    const logout = () => {
        localStorage.removeItem("user"); // Clear user data from localStorage
        navigate("/landing"); // Redirect to the landing page
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = user?.token || (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null);
                if (!token) {
                    console.error("No token found, user is not logged in.");
                    return;
                }

                console.log("Fetching user info with token:", token);
                const response = await axios.get("http://localhost:5000/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}` // Send token in Authorization header
                    }
                });

                console.log("User Info Response:", response.data);
                setUserInfo(response.data.user);
            } catch (error) {
                console.error("Error fetching user info:", error.response?.data || error.message);
            }
        };

        fetchUserInfo();
    }, [user]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    console.log("User:", user);
    console.log("User Info:", userInfo);
    console.log("LocalStorage user:", localStorage.getItem("user"));

    return (
        <>
            <div className="theme">
                <div className="lnd-video-container">
                    <video src="/videos/mixkit-one-coffee-cup-in-a-sea-of-coffee-beans-43940-4k.mp4" autoPlay loop muted preload="auto" />
                </div>

                <div className="headboard">
                    {/* Hamburger Menu */}
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className={`bar ${menuOpen ? "open" : ""}`}></div>
                        ))}
                    </div>

                    <div className={`links-ham ${menuOpen ? "show" : ""}`}>
                        <Link to="/menu">Home</Link>
                        <Link to="/reservation">Products</Link>
                        <Link to="/baking-lessons">Carbon FootPrint Calculator</Link>
                        <Link to="/rate-my-cake">Energy Usage Tracker</Link>
                        <Link to="/contact">Find an EV Charger</Link>
                    </div>

                    <div className="head-content">
                        <header>
                            <img src={logo} alt="Bean and Brew Cafe Logo" className="lnd_logo" />
                            <h1>Bean and Brew Cafe</h1>
                        </header>

                        <div className="links">
                            <Link to="/menu">Home</Link>
                            <Link to="/reservation">Products</Link>
                            <Link to="/baking-lessons">Carbon FootPrint Calculator</Link>
                            <Link to="/rate-my-cake">Energy Usage Tracker</Link>
                            <Link to="/contact">Find an EV Charger</Link>
                        </div>
                    </div>

                    <div className="nav">
                        <h5>
                            {userInfo ? (
                                <Link to="/account-details" className="username-link">
                                    {userInfo.username}
                                </Link>
                            ) : (
                                "Loading user data..."
                            )}
                        </h5>
                    </div>
                </div>
            </div>

            {["Nourish Your Body, Lift Your Spirits", "Handmade. Hand delivered.", "Our Seasonal Pastry Rota"].map((title, index) => (
                <div key={index} className="seasonal_offer">
                    <img src={croissant} alt="Croissant" />
                    <h4>{title}</h4>
                    <p>{
                        index === 0 ? "Crafted with fresh, wholesome ingredients and bold flavours, our new menu is designed to make you feel good, every day." :
                        index === 1 ? "Our freshly made food, delivered from our kitchen to your door. Made for important meetings, treating busy teams or entertaining friends and family at home. We deliver freshly made breakfast, lunch & sweet platters straight to your door. Order by 10am for same-day delivery." :
                        "Pastries, wonderful pastries. Hearty, wholesome, light, bright – whatever sort you like, our famous Pastry Rota has pots packed with flavours sure to stir up your lunch. Spoons at the ready."
                    }</p>
                    <Link to="/menu">
                        <button>{index === 2 ? "View Rota" : "Find out more"}</button>
                    </Link>
                </div>
            ))}

            <div className="menu">
                <h3>Our Food and Drink Menu</h3>
                {["Pastries and Baked Goods", "Seasonal Menu", "Coffee and Hot Drinks", "Hot Food", "Cakes", "Sandwiches and Wraps", "Fruit & Fruit Pots", "Cold Drinks"].map((item, index) => (
                    <Link to="/menu" key={index}>
                        <div className="menu-type">
                            <img src={croissant} alt="Croissant" />
                            <span>{item}</span>
                        </div>
                    </Link>
                ))}
                <button onClick={logout}>Logout</button>
            </div>
        </>
    );
};

export default HomePg;
