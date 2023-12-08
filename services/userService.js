const axios = require("axios");
const userServiceUrl = process.env.USER_SERVICE_URL || 'http://10.97.94.32:8082/api/v1';
const { StatusCodes } = require("http-status-codes");

const userService = {
  createUser: async (req, res) => {
    try {
      const response = await axios.post(`${userServiceUrl}/users`, req.body);
      res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
      const status =
        error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = error?.response?.data ?? "Internal Server Error";
      res.status(status).json({
        error: errorMessage,
      });
    }
  },
  // not implemented  properly
  getAllUsers: async (req, res) => {
    try {
      const response = await axios.get(`${userServiceUrl}/users`);
      res.status(StatusCodes.OK).json(response.data);
    } catch (error) {
      const status =
        error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = error?.response?.data ?? "Internal Server Error";
      res.status(status).json({
        error: errorMessage,
      });
    }
  },
  getUserByUserId: async (req, res) => {
    try {
      const userDetailResponse = await axios.get(
        `${userServiceUrl}/users/${req.params.userId}`
      );
      const userProfileResponse = await axios.get(
        `${userServiceUrl}/users/user-profile/${req.params.userId}`
      );

      let response = userDetailResponse.data;

      if (
        userProfileResponse.data &&
        typeof userProfileResponse.data === "object"
      ) {
        const {
          deliveryAddress,
          city,
          postalCode,
          profilePicture,
          modifiedDate: profileModifiedData,
        } = userProfileResponse.data;
        response = {
          ...response,
          deliveryAddress,
          city,
          postalCode,
          profilePicture,
          profileModifiedData,
        };
      }

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      const status =
        error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = error?.response?.data ?? "Internal Server Error";
      res.status(status).json({
        error: error,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const response = await axios.put(
        `${userServiceUrl}/users/${req.params.userId}`,
        req.body
      );
      res.status(StatusCodes.OK).json(response.data);
    } catch (error) {
      const status =
        error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = error?.response?.data ?? "Internal Server Error";
      res.status(status).json({
        error: errorMessage,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const response = await axios.delete(
        `${userServiceUrl}/users/${req.params.userId}`
      );
      res.status(StatusCodes.OK).json(response.data);
    } catch (error) {
      const status =
        error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = error?.response?.data ?? "Internal Server Error";
      res.status(status).json({
        error: errorMessage,
      });
    }
  },
  createUserProfile: async (req, res) => {
    try {
      const response = await axios.post(
        `${userServiceUrl}/users/user-profile`,
        req.body
      );
      res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
      const status =
        error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = error?.response?.data ?? "Internal Server Error";
      res.status(status).json({
        error: errorMessage,
      });
    }
  },
  updateUserProfile: async (req, res) => {
    try {
      const response = await axios.put(
        `${userServiceUrl}/users/user-profile/${req.params.userId}`,
        req.body
      );
      res.status(StatusCodes.OK).json(response.data);
    } catch (error) {
      const status =
        error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = error?.response?.data ?? "Internal Server Error";
      res.status(status).json({
        error: errorMessage,
      });
    }
  },
  getUserProfileById: async (req, res) => {
    try {
      const response = await axios.get(
        `${userServiceUrl}/users/user-profile/${req.params.userId}`
      );
      res.status(StatusCodes.OK).json(response.data);
    } catch (error) {
      const status =
        error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = error?.response?.data ?? "Internal Server Error";
      res.status(status).json({
        error: errorMessage,
      });
    }
  },
};

module.exports = userService;
