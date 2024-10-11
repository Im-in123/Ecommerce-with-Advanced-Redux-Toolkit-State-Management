// controllers/access/controls/product/getSellerProducts.js

import ProductModel from "../../../../models/ProductModel.js";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();
const config = process.env;
const jwt = jsonwebtoken;

const getSellerProducts = async (req, res) => {
    console.log("Fetching seller products");

    try {
        // Check if the token exists in signed cookies
        const token = req.signedCookies["advanced-state-management-user"];

        // Verify the JWT token
        let user;
        try {
            user = jwt.verify(token, config.TOKEN);
        } catch (err) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Invalid token",
                status: 401,
                ok: false,
            });
        }

        const sellerId = user.userId; // Get the seller ID from the token

        if (!sellerId) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "User ID is invalid",
                status: 401,
                ok: false,
            });
        }

        // Fetch products created by the seller
        const products = await ProductModel.findAll({
            where: { sellerId: sellerId }, // Assuming sellerId is a field in the ProductModel
        });

        return res.status(200).json({
            message: "Products fetched successfully",
            products,
            ok: true,
        });
    } catch (error) {
        console.error("Error fetching seller products:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
            status: 500,
            ok: false,
        });
    }
};

export default getSellerProducts;
