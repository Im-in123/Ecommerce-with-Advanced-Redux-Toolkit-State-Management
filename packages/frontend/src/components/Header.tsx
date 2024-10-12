import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Header.css";
import { AuthState, UserResponse } from '../services/auth/types';
import { useLogoutMutation } from "../services/auth/authSlice";
import { useAppSelector } from "../store";
import { selectCartCount } from "../services/cart/cartSlice";
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const Header = () => {
    let authState: AuthState = {
        user: null,
        token: null
    };

    const { user, token } = useAppSelector((state) => state.auth); // Get the auth state
    const cartCount = useAppSelector(selectCartCount); // Get the cart item count
    const userSession = sessionStorage.getItem("user"); // Check for user session
    const response: UserResponse = userSession ? JSON.parse(userSession) : null; // Parse user session

    // Check authentication state and update authState
    if (sessionStorage.getItem("isAuthenticated") === "true" && response !== null) {
        authState = {
            user: {
                username: response.username,
                id: response.userId,
                email: response.email,
                role: response.role
            } ?? user,
            token: response.token ?? token
        };
    }

    const isAuthenticated = authState.user !== null && authState.token !== null; // Determine if user is authenticated
    const [logout, { isLoading }] = useLogoutMutation(); // Logout mutation
    const navigate = useNavigate(); // Hook for navigation
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for controlling dropdown visibility

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = () => {
        logout();
        navigate("/auth/login", {
            replace: true, // Replace the current entry in the history stack
        });
    };

    return (
        <header className="header">
            <nav className="navbar">
                <Link to="/">Home</Link>

                {isAuthenticated && authState.user.role !== "admin" && (
                    <>
                        <Link to="/products">Products</Link>
                    </>
                )}
                {isAuthenticated && authState.user.role === "admin" && (
                    <>
                        <Link to="/admin">Users</Link>
                    </>
                )}
                {isAuthenticated && authState.user.role === "shopper" && (
                    <>
                        <Link to="/orders">Orders</Link>
                    </>
                )}
            
                <div className="auth-links">
                    {isAuthenticated ? (
                        <>
                           
                            {/* Show cart icon and count only for shoppers */}
                            {authState.user.role === "shopper" && (
                                <Link to="/cart" className="cart-link">
                                    <FaShoppingCart className="cart-icon" />
                                    {cartCount > 0 &&  <span className="cart-count-cont"> <span className="cart-count">{cartCount > 0 ? cartCount : ''}</span> </span>}{/* Show count only if greater than 0 */}
                                </Link>
                            )}

<div className="avatar-container" onClick={toggleDropdown}>
                                <FaUserCircle className="avatar-icon" />
                                {dropdownOpen && (
                                    <div className="dropdown">
                                        <span>Username: {authState.user.username}</span>
                                        <span>Role: {authState.user.role}</span>
                                        <button onClick={handleLogout} disabled={isLoading}>
                                            {isLoading ? "Logging out..." : "Logout"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/auth/login">Login</Link>
                            <Link to="/auth/register">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
