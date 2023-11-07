const userRoutes = (req, res, next) => {
    if(req.user.role === "User" || req.user.role === "Admin") {
        next(); //access to both users
    }
    else {
        res.status(403).send("Access Denied: User role required");
    }
}

module.exports = userRoutes;