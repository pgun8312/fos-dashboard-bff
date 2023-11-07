const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const getJwkData = require('./getJwkData.js'); // Import the getJwkData function
const region = process.env.AWS_REGION;
const userPoolId = process.env.AWS_USER_POOL_ID;
const awsClientId = process.env.AWS_CLIENT_ID;

async function validateAccessToken(accessToken) {
  try {
    
    console.log("Step: 4")
    const jwkData = await getJwkData();
    console.log("Step: 5")
    const jwk = jwkData[0];
    const pem = jwkToPem(jwk);

    console.log("Decoding token...")
    console.log(accessToken);
    console.log("-----------------------------------------------")
    console.log(pem);

    const token = accessToken.replace("Bearer ", "");
    console.log(token);
    const decodedToken = jwt.verify(token, pem, { algorithms: ['RS256'] });
    console.log("Token decoded:", decodedToken);
    console.log("Step: 6")

    const currentTime = Math.floor(Date.now() / 1000);

    console.log("Step: 7")

    if (decodedToken.exp <= currentTime) {
      throw new Error('Token has expired');
    }

    console.log("Step: 8")

    if (decodedToken.aud !== awsClientId) {
      throw new Error("Invalid client_id");
    }
    console.log("Step: 9")

    const issuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;
    if (decodedToken.iss !== issuer) {
      throw new Error("Invalid issuer");
    }

    if (decodedToken.token_use !== 'access') {
      throw new Error("Invalid token use");
    }

    // Return the decoded token
    return decodedToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = validateAccessToken;
