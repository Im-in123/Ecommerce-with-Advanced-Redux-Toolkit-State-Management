

import UserModel from "../../../../models/UserModel.js";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();
const config = process.env;
const jwt = jsonwebtoken;

const adminGetUsers = async (req, res) => {
    console.log("in admin get users");

    try {
        
        let user = req.user;
      

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
