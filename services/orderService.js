const axios = require("axios");
const productServiceUrl = "http://localhost:8080/api/v1";
const orderServiceUrl = "http://localhost:8081/api/v1";
const userServiceUrl = "http://localhost:8082/api/v1";
const { StatusCodes } = require("http-status-codes");

const orderService = {
  placeOrder: async (req, res) => {
    try {
      const userId = req.body.userId;
      const orderItems = req.body.orderItems;

      //if the user does not exists it throw an error
      const userDetailResponse = await axios.get(
        `${userServiceUrl}/users/${userId}`
      );
      //get the userProfileDetails
      const userProfileResponse = await axios.get(
        `${userServiceUrl}/users/user-profile/${userId}`
      );

      //create the user Details map with the userProfile conditionally, because user Profile may not exists
      let UserResponse = userDetailResponse.data;

      if (
        userProfileResponse.data &&
        typeof userProfileResponse.data === "object"
      ) {
        const { deliveryAddress, city, postalCode } = userProfileResponse.data;
        UserResponse = {
          ...UserResponse,
          deliveryAddress,
          city,
          postalCode,
        };
      }
      const orderItemsDetails = await Promise.all(
        orderItems.map(async (orderItem) => {
          //call the existence check for the each product
          const productItemResponse = await axios.get(
            `${productServiceUrl}/products/${orderItem.productId}`
          );
          const productItem = productItemResponse?.data;

          //not found or not available throw an error
          if (!productItem || productItem.status === "notAvailable") {
            throw {
              code: StatusCodes.NOT_FOUND,
              message: `Product with ID ${orderItem.productId} is not available`,
            };
          }
          //create the orderItem details
          const orderItemDetails = {
            productId: orderItem.productId,
            productName: productItem.name,
            unitPrice: productItem.price,
            quantity: orderItem.quantity,
          };

          //return the orderItemDetails
          return orderItemDetails;
        })
      );

      const totalAmount = orderItemsDetails.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0
      );

      //create the request
      const orderRequest = {
        orderStatus: "PROCESSING",
        orderItems: orderItemsDetails,
        totalAmount,
        userId,
      };

      //call the place order with updated orderRequest
      const response = await axios.post(
        `${orderServiceUrl}/orders`,
        orderRequest
      );
      res
        .status(StatusCodes.CREATED)
        .json({ ...response.data, userDetails: UserResponse });
    } catch (error) {
      const status =
        error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = error?.response?.data ?? "Internal Server Error";
      res.status(status).json({
        error: error,
      });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const response = await axios.get(`${orderServiceUrl}/orders`);
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
  getOrderById: async (req, res) => {
    try {
      const response = await axios.get(
        `${orderServiceUrl}/orders/${req.params.orderId}`
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
  updateOrder: async (req, res) => {
    try {
      const response = await axios.patch(
        `${orderServiceUrl}/orders/${req.params.orderId}`,
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
  deleteOrder: async (req, res) => {
    try {
      const response = await axios.delete(
        `${orderServiceUrl}/orders/${req.params.orderId}`
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
  getOrdersByUserId: async (req, res) => {
    try {
      const response = await axios.get(
        `${orderServiceUrl}/users/${req.params.userId}/orders`
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

module.exports = orderService;
