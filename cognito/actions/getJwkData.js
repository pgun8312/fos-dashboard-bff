const axios = require('axios');

const getJwkData= async ()=> {
  const jwksUri = process.env.AWS_JWKS || 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ukAzi5VF5/.well-known/jwks.json';
  console.log("JWKS URL:", jwksUri); // Log the URL before the request
  
  try {
    console.log("Step: 1")
    const response = await axios.get(jwksUri);
    // console.log("JWKS Response:", response.data);
    console.log("Step: 2")

    return response.data.keys;
  } catch (error) {
    console.log("Step: 3")

    console.error('Error fetching JWK data:', error);
    throw error;
  }
}

module.exports = getJwkData;