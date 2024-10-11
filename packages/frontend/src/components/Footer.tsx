import React from 'react';
import "../styles/Footer.css"
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 YourCompany. All Rights Reserved.</p>
                <div className="social-links">
                    <a href="#facebook">Facebook</a>
                    <a href="#twitter">Twitter</a>
                    <a href="#instagram">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
