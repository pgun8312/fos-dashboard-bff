const adminRoutes = (req, res, next) => {
    if(req.user.role == "Admin") {
        next();//allow access to admin only
    } else {
        res.status(403).send("Access Denied: Admin role required");
    }
}

module.exports = adminRoutes;