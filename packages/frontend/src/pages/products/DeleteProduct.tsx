import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "../../services/products/productSlice";
import "../../styles/DeleteProduct.css"; // Importing the CSS file

const DeleteProduct = ({ productId }) => {
    const navigate = useNavigate();
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    // Function to handle product deletion
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await deleteProduct({ productId }).unwrap();
                console.log("Product deleted successfully");
                // Redirect to the products list page after deletion
                navigate("/products");
            } catch (error) {
                console.error("Failed to delete the product:", error);
            }
        }
    };

    return (
        <button className="delete-button" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Product"}
        </button>
    );
};

export default DeleteProduct;