

import UserModel from "../../../../models/UserModel.js";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();
const config = process.env;
const jwt = jsonwebtoken;

const adminGetUser = async (req, res) => {
    console.log("in admin get user");

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
                message: "Invalid cookie or cookie not found!",
                status: 401,
                ok: false,
            });
        }

        // Ensure the user making the request is an admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { userId } = req.params;

        // Find the user by ID
        const foundUser = await UserModel.findOne({ where: { id: userId } });

        if (!foundUser) {
            return res.status(404).json({ message: "User not found", ok: false });
        }

        // Respond with the user information
        return res.status(200).json({ user: foundUser, ok: true });
    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export default adminGetUser;
