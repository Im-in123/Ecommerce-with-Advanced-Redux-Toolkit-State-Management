import React, { useState } from "react";
import { useAddProductMutation, useUpdateProductMutation, useFetchProductsQuery } from "../../services/products/productSlice";
import { useParams, useHistory } from "react-router-dom";

const ProductForm = () => {
    const { id } = useParams();
    const { data: products } = useFetchProductsQuery();
    const product = products?.find((prod) => prod.id === id);

    const [name, setName] = useState(product?.name || "");
    const [price, setPrice] = useState(product?.price || "");
    const [description, setDescription] = useState(product?.description || "");
    const [stock, setStock] = useState(product?.stock || "");

    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct = { name, price: parseFloat(price), description, stock: parseInt(stock) };

        if (product) {
            await updateProduct({ id: product.id, data: newProduct });
        } else {
            await addProduct(newProduct);
        }

        history.push("/products");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>{product ? "Edit Product" : "Add Product"}</h1>
            <div>
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Price</label>
                <input value={price} onChange={(e) => setPrice(e.target.value)} required type="number" />
            </div>
            <div>
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
                <label>Stock</label>
                <input value={stock} onChange={(e) => setStock(e.target.value)} required type="number" />
            </div>
            <button type="submit">{product ? "Update Product" : "Add Product"}</button>
        </form>
    );
};

export default ProductForm;
