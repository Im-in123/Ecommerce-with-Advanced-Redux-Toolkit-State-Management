import React from "react";

const UserSpecificProducts = ({ isAuthenticated }) => {
    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <h2>User Specific Products</h2>
                    {/* Render products by user */}
                </div>
            ) : (
                <p>You need to be logged in to view your products.</p>
            )}
        </div>
    );
};

export default UserSpecificProducts;
