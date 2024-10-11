// security/adminCheck.js

const adminCheck = (req, res, next) => {
    const token = req.signedCookies["advanced-state-management-user"];
    if (!token) {
        return res.status(403).json({
            error: "Unauthorized",
            message: "No token provided",
            status: 403,
            ok: false,
        });
    }

    const user = jwt.verify(token, process.env.TOKEN);
    
    if (user.role !== "admin") {
        return res.status(403).json({
            error: "Forbidden",
            message: "You are not authorized to perform this action",
            status: 403,
            ok: false,
        });
    }

    req.user = user; // Set the user in req for later use in controllers
    next();
};

export default adminCheck;
