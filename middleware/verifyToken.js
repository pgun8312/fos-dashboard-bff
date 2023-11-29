const { CognitoJwtVerifier } = require("aws-jwt-verify");
const axios = require("axios");
const userServiceUrl = "http://localhost:8082/api/v1";

const verifyToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization || "";
  if (!authorizationHeader) {
    return res.status(401).send("Unauthorized");
  }
  const token = authorizationHeader.replace("Bearer ", "");

  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.AWS_USER_POOL_ID || "us-east-1_ukAzi5VF5",
    tokenUse: "access",
    clientId: process.env.AWS_CLIENT_ID || "62p8ujkfjp2v7dmtvj1up0ecd8",
    timeout: 15000,
  });

  try {
    const payload = await verifier.verify(token);

    if (payload.client_id !== process.env.AWS_CLIENT_ID) {
      return res.status(401).send("Unauthorized: Invalid client_id");
    }

    /* Using the user service to get the role but need to do it using the token but for now using the user service */

    const { sub } = payload;

    const response = await axios.get(
      `${userServiceUrl}/users/user-role/${sub}`
    );
    console.log(response.data);

    // if (payload["custom:role"] === "Admin") {
    if (response.data === "ADMIN") {
      /* This is not the correct way */
      req.user = {
        id: payload.sub,
        username: payload.username,
        scope: payload.scope,
        role: "Admin",
      };
    } else {
      req.user = {
        id: payload.sub,
        username: payload.username,
        scope: payload.scope,
        role: "User", // Default to "User" if no role claim
      };
    }
    next();
  } catch (error) {
    if (error.message.includes("Token expired")) {
      return res.status(401).send("Unauthorized: Token has expired");
    } else if (error.message.includes("Invalid issuer")) {
      return res.status(401).send("Unauthorized: Invalid issuer");
    } else if (error.message.includes("Invalid audience")) {
      return res.status(401).send("Unauthorized: Invalid audience");
    } else {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
};

module.exports = { verifyToken };
