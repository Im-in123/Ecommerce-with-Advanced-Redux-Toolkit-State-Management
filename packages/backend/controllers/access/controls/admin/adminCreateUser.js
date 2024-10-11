// controllers/access/controls/user/adminCreateUser.js

import UserModel from "../../../../models/UserModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();
const config = process.env;
const jwt = jsonwebtoken;

const adminCreateUser = async (req, res) => {
    console.log("in admin create user");

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

        // Ensure the user making the request is an admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { username, password, email, role } = req.body;

        // Validate input
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Invalid Request" });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", ok: false });
        }
        
        const emailExists = await UserModel.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({ message: "Email already taken", ok: false });
        }

        // Password Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with role
        await UserModel.create({
            username,
            email,
            password: hashedPassword,
            salt: salt,
            role: role || "shopper", // Default to shopper if no role is provided
        });

        return res.status(200).json({ message: "User Created", ok: true });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export default adminCreateUser;