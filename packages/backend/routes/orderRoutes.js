import { Router } from "express";
import checkout from "../controllers/access/controls/order/checkout.js";
import getUserOrders from "../controllers/access/controls/order/getUserOrders.js";
import tokenVerification from "../security/authentication.js";

const checkoutRoutes = Router();

// Checkout route
checkoutRoutes.post("/checkout", tokenVerification, checkout);
// Route to get user orders
checkoutRoutes.get("/orders", tokenVerification, getUserOrders);

export default checkoutRoutes;
