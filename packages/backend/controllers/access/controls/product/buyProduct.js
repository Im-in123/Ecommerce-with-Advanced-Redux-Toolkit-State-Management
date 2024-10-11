// controllers/access/controls/product/buyProduct.js

import ProductModel from "../../../../models/ProductModel.js" // Adjust the path as necessary

const buyProduct = async (req, res) => {
    const { productId, quantity } = req.body;

    // Check if the user has shopper role
    if (req.user.role !== "shopper") {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        const product = await ProductModel.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found", ok: false });
        }

        // Check if there is enough stock
        if (quantity > product.stock) {
            return res.status(400).json({ message: "Not enough stock available", ok: false });
        }

        // Update product stock
        product.stock -= quantity;
        await product.save();

        return res.status(200).json({ message: "Purchase successful", ok: true, data: product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export default buyProduct;
