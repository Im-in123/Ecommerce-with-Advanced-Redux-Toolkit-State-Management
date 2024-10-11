import { Router } from "express";
import adminCreateUser from "../controllers/access/controls/admin/adminCreateUser.js";
import adminDeleteUser from "../controllers/access/controls/admin/adminDeleteUser.js";
import adminGetUser from "../controllers/access/controls/admin/adminGetUser.js";
import adminGetUsers from "../controllers/access/controls/admin/adminGetUsers.js";
import adminUpdateUser from "../controllers/access/controls/admin/adminUpdateUser.js";

import tokenVerification from "../security/authentication.js";

const adminRoutes = Router({ mergeParams: true });

// Admin routes
adminRoutes.post("/admin/user/create", tokenVerification, adminCreateUser);
adminRoutes.delete("/admin/user/delete/:userId", tokenVerification, adminDeleteUser);
adminRoutes.get("/admin/users", tokenVerification, adminGetUsers);
adminRoutes.get("/admin/user/:userId", tokenVerification, adminGetUser);
adminRoutes.put("/admin/user/update/:userId", tokenVerification, adminUpdateUser);
export default adminRoutes;
