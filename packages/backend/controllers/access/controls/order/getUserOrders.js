import OrderModel from "../../../../models/OrderModel.js"; // Import OrderModel
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();
const config = process.env;
const jwt = jsonwebtoken;

const getUserOrders = async (req, res) => {
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

        const userId = user.userId ?? null;

        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized or cookie has expired",
                message: "Cookie is invalid",
                status: 401,
                ok: false,
            });
        }

        // Fetch orders for the user
        const orders = await OrderModel.findAll({
            where: { userId },
        });

        return res.status(200).json({
            orders,
            ok: true,
        });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return res.status(503).json({
            error: "Internal server error",
            message: error.message,
            status: 503,
            ok: false,
        });
    }
};

export default getUserOrders;
