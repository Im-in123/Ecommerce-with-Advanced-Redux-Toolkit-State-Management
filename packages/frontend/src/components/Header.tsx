import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Header.css";
import { useLogoutMutation } from "../services/auth/authSlice";
import { useAppSelector } from "../store";
import { selectCartCount } from "../services/cart/cartSlice";
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { clearCart } from '../services/cart/cartSlice';
import { persistor,  useAppDispatch } from '../store';
 
const Header = () => {
    const { user, token } = useAppSelector((state) => state.auth); // Get the auth state
    const cartCount = useAppSelector(selectCartCount); // Get the cart item count

    // Determine if the user is authenticated
    const isAuthenticated = !!(user && token);
    const [logout, { isLoading }] = useLogoutMutation(); // Logout mutation
    const navigate = useNavigate(); // Hook for navigation
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for controlling dropdown visibility
    const dispatch = useAppDispatch();
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = () => {
        logout();
        // Dispatch the action to clear the cart
        dispatch(clearCart());

    // Purge the persisted state
    persistor.purge();
        navigate("/auth/login", {
            replace: true, // Replace the current entry in the history stack
        });
    };

    return (
        <header className="header">
            <nav className="navbar">
                <Link to="/">Home</Link>

                {/* Conditional rendering based on user role */}
                {isAuthenticated && user.role !== "admin" && (
                    <Link to="/products">Products</Link>
                )}
                {isAuthenticated && user.role === "admin" && (
                    <Link to="/admin">Users</Link>
                )}
                {isAuthenticated && user.role === "shopper" && (
                    <Link to="/orders">Orders</Link>
                )}

                <div className="auth-links">
                    {isAuthenticated ? (
                        <>
                            {/* Show cart icon and count only for shoppers */}
                            {user.role === "shopper" && (
                                <Link to="/cart" className="cart-link">
                                    <FaShoppingCart className="cart-icon" />
                                    {cartCount > 0 && (
                                        <span className="cart-count-cont">
                                            <span className="cart-count">{cartCount}</span>
                                        </span>
                                    )}
                                </Link>
                            )}

                            <div className="avatar-container" onClick={toggleDropdown}>
                                <FaUserCircle className="avatar-icon" />
                                {dropdownOpen && (
                                    <div className="dropdown">
                                        <span>Username: {user.username}</span>
                                        <span>Role: {user.role}</span>
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
