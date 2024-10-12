

import UserModel from "../../../../models/UserModel.js";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();
const config = process.env;
const jwt = jsonwebtoken;

const adminGetUsers = async (req, res) => {
    console.log("in admin get users");

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

        // Retrieve all users
        const users = await UserModel.findAll(); // Adjust as necessary for your ORM

        // Respond with the list of users
        return res.status(200).json({ users, ok: true });
    } catch (error) {
        console.error("Error retrieving users:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export default adminGetUsers;
