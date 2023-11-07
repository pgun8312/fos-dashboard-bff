const validateAccessToken = require('../cognito/actions/validateAccessToken');

const validateAccessTokenMiddleware = async (req, res, next) => {
    try {
        // Validate the access token in the request headers
        const accessToken = req.headers.authorization; // Assuming the token is in the Authorization header
        const user = await validateAccessToken(accessToken);
        
        // Attach the user object to the request for downstream route handlers
        req.user = user;

        next();
    } catch (error) {
        // If token validation fails, return an error response
        res.status(401).json({ error: 'Unauthorized', message: error.message });
    }
};

module.exports = validateAccessTokenMiddleware;
