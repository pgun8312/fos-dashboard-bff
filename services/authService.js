const { StatusCodes } = require("http-status-codes");
const signUp = require("../cognito/actions/sign-up");
const { default: axios } = require("axios");
const resendConfirmationCode = require("../cognito/actions/resend-confirmation-code");
const confirmSignUp = require("../cognito/actions/confirm-sign-up");
const initiateAuth = require("../cognito/actions/initiate-auth");
const jwt = require("jsonwebtoken");
const userServiceUrl = "http://localhost:8082/api/v1";

const authService = {
  signUp: async (req, res) => {
    const clientId = process.env.AWS_CLIENT_ID;
    const { userName, password, email, name, phone } = req.body;
    //checking the email is exists in local database
    const userEmailExists = await axios.post(
      "http://localhost:8082/api/v1/users/get-userBy-email",
      { email }
    );
    console.log(userEmailExists.data);
    if (userEmailExists.data !== "") {
      // Return an error indicating that the email is already in use
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Email is already in use.",
      });
    }

    const userAttributes = [{ Name: "email", Value: email }];
    try {
      const signUpResult = await signUp({
        clientId,
        username: userName,
        password,
        userAttributes,
      });

      const userSub = signUpResult.UserSub;
      const user = {
        userSub,
        userName,
        name,
        email,
        phone,
      };

      // Call the user service to create the user in your local database
      const createUserResponse = await axios.post(
        "http://localhost:8082/api/v1/users",
        user
      );

      res.status(StatusCodes.CREATED).json({
        message: `Your account successfully created...verification code send to ${signUpResult.CodeDeliveryDetails.Destination} via ${signUpResult.CodeDeliveryDetails.DeliveryMedium} `,
        accountStatus:
          signUpResult.UserConfirmed === false ? "Unconfirmed" : "Confirmed",
        user: createUserResponse.data,
      });
    } catch (error) {
      // console.error("Sign-up error:", error);
      res.status(StatusCodes.BAD_REQUEST).json({
        error: error,
      });
    }
  },
  resendConfirmationCode: async (req, res) => {
    const { userName } = req.body;
    const clientId = process.env.AWS_CLIENT_ID;

    try {
      const response = await resendConfirmationCode({
        clientId,
        username: userName,
      });
      res.status(StatusCodes.OK).json({
        message: `Verification code re-send to your email ${response.CodeDeliveryDetails.Destination}`,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: error.message,
      });
    }
  },
  confirmSignUp: async (req, res) => {
    const { userName, code } = req.body;
    const clientId = process.env.AWS_CLIENT_ID;

    try {
      const response = await confirmSignUp({
        clientId,
        username: userName,
        code,
      });
      res.status(StatusCodes.OK).json({
        message: `Your account successfully Verified...`,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: error.message,
      });
    }
  },
  login: async (req, res) => {
    const { userName, password } = req.body;
    const clientId = process.env.AWS_CLIENT_ID;

    try {
      const response = await initiateAuth({
        username: userName,
        password,
        clientId,
      });
      console.log(response);

      // Decode the ID token
      const idToken = response.AuthenticationResult.IdToken;
      const decodedToken = jwt.decode(idToken, { complete: true }); // Decode the token and parse header and payload

      // Extract user claims
      const userClaims = decodedToken.payload;
      // console.log(userClaims);

      //extracting the user sub
      const email = userClaims.email;
      const userSub = userClaims.sub;
      const userRole = userClaims["custom:role"];

      //getting the user Profile
      const userResponse = await axios.post(
        `${userServiceUrl}/users/get-userBy-email`,
        {
          email: email,
        }
      );
      const user = userResponse?.data || {};

      res.status(StatusCodes.OK).json({
        accessToken: response.AuthenticationResult.AccessToken,
        idToken: response.AuthenticationResult.IdToken,
        expiresIn: response.AuthenticationResult.ExpiresIn,
        TokenType: response.AuthenticationResult.TokenType,
        user: {
          ...user,
          role: userRole,
        } /* overriding local user service role with cognito userRole */,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: error,
      });
    }
  },
  resetPasswordRequest: async (req, res) => {
    res.send(
      "Used to request a password reset. Clients provide an email or username to initiate the password reset process"
    );
  },
  resetPassword: async (req, res) => {
    res.send(
      " Used to confirm a password reset. Clients provide a confirmation code and a new password to reset the user's password"
    );
  },
};

module.exports = authService;
