import React from "react";
import { useGetAllProductsQuery, useGetOwnProductsQuery } from "../../services/products/productSlice";
import { Link } from "react-router-dom";
import "../../styles/ProductList.css"; 
import { BASE_URL } from "../../constants";

const ProductList = ({ isAuthenticated, authState }: { isAuthenticated: boolean; authState: any }) => {
    const { data: products, error, isLoading } = 
        authState?.user?.role === "seller" ? useGetOwnProductsQuery() : useGetAllProductsQuery();  
    console.log(authState);

    if (isLoading) {
        return (
            <div className="loading"> 
                {authState?.user?.role === "seller" ? "Loading your products..." : "Loading products..." }
            </div>
        );
    }

    if (error) {
        return <div className="error">Error loading products: {error?.message || "Unexpected error occurred."}.</div>;
    }

    return (
        <>
         <h1>{authState?.user?.role === "seller" ? "Your Products" : "Products"}</h1>
         {products.length === 0 && <p>No Products Found!</p>}
        <div className="product-list">
           
            {products?.map((product) => (
                <div key={product.id} className="product-item">
                    <Link to={`/products/${product.id}`} className="product-link">
                        <img 
                            src={`${BASE_URL}/uploads/${product.imageUrl}`} 
                            alt={product.name} 
                            className="product-image" 
                        />
                        <h2>{product.name}</h2>
                    </Link>
                    <p className="product-price">${product.price}</p>
                </div>
            ))}
        </div>
        </>
    );
};

export default ProductList;
