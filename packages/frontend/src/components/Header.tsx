import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Header.css"; // Import your CSS styles
import { AuthState, UserResponse } from '../services/auth/types'; // Adjust the import path as necessary
import { useLogoutMutation } from "../services/auth/authSlice"; // Import the logout mutation
import { useAppSelector } from "../store"; // Hook to access the Redux store
import { selectCartCount } from "../services/cart/cartSlice"; // Import the cart count selector
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon from React Icons

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

    return (
        <header className="header">
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                {isAuthenticated && authState.user.role === "admin" && (
                    <>
                        <Link to="/admin">Admin</Link>
                    </>
                )}
                 {isAuthenticated && authState.user.role === "shopper" && (
                    <>
                        <Link to="/orders">Orders</Link>
                    </>
                )}
                <Link to="/contact">Contact</Link>
                <div className="auth-links">
                    {isAuthenticated ? (
                        <>
                            <span>{authState.user.username}</span>
                            {/* Show cart icon and count only for shoppers */}
                            {authState.user.role === "shopper" && (
                                <Link to="/cart" className="cart-link">
                                    <FaShoppingCart className="cart-icon" />
                                    <span className="cart-count">{cartCount > 0 ? cartCount : ''}</span> {/* Show count only if greater than 0 */}
                                </Link>
                            )}
                            <button onClick={() => {
                                logout(); // Trigger logout
                                navigate("/", {
                                    replace: true, // Replace the current entry in the history stack
                                });
                            }}>
                                {isLoading ? "Logging out..." : "Logout"}
                            </button>
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
