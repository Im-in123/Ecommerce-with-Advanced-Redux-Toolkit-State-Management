import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/LandingPage.css';
const LandingPage =  ({
	isAuthenticated,
	authState,
}: { isAuthenticated: boolean; authState: AuthState })=> {
    return (
        <>
        <Header/>
        <div className="landing-page">
            <section className="hero-section">
                <h1>Welcome to Our Platform</h1>
                <p>Your one-stop shop for all your needs</p>
                <button>Shop Now</button>
            </section>
            <section className="featured-products">
                <h2>Featured Products</h2>
                {/* You can map through some featured products here */}
            </section>
            <section className="about-section">
                <h2>About Us</h2>
                <p>We aim to provide the best products at the best prices!</p>
            </section>
        </div>
        <Footer/>
        </>
    );
};

export default LandingPage;
