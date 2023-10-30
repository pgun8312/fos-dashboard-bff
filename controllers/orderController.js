const express = require('express');
const orderService = require('../services/orderService');
const router = express.Router();

/**
 * @openapi
 * /api/v1/orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       url: 'http://localhost:8081/swagger-ui/index.html#/Order%20Controller/getAllOrders'
 *     tags:
 *      - Orders
 */
router.get('/', orderService.getAllOrders);
/**
 * @openapi
 * /api/v1/orders:
 *   post:
 *     summary: Place a new order
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: number
 *                     quantity:
 *                       type: number
 *             required:
 *               - userId
 *               - orderItems
 *     responses:
 *       201:
 *         description: Successful creation response
 *     externalDocs:
 *       url: 'http://localhost:8081/swagger-ui/index.html#/Order%20Controller/createOrder'
 *     tags:
 *      - Orders
 */
router.post('/',orderService.placeOrder);
/**
 * @openapi
 * /api/v1/orders/{orderId}:
 *   get:
 *     summary: Get a specific order by ID
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: number
 *         required: true
 *         description: The ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       url: 'http://localhost:8081/swagger-ui/index.html#/Order%20Controller/getOrderById'
 *     tags:
 *      - Orders
 */
router.get('/:orderId', orderService.getOrderById);
/**
 * @openapi
 * /api/v1/orders/{orderId}:
 *   patch:
 *     summary: Update a specific order by ID
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: number
 *         required: true
 *         description: The ID of the order to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       url: 'http://localhost:8081/swagger-ui/index.html#/Order%20Controller/updateOrder'
 *     tags:
 *      - Orders
 */
router.patch('/:orderId', orderService.updateOrder);
/**
 * @openapi
 * /api/v1/orders/{orderId}:
 *   delete:
 *     summary: Delete a specific order by ID
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: number
 *         required: true
 *         description: The ID of the order to delete
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       url: 'http://localhost:8081/swagger-ui/index.html#/Order%20Controller/cancelOrder'
 *     tags:
 *      - Orders
 */ 
router.delete('/:orderId', orderService.deleteOrder);
/**
 * @openapi
 * /api/v1/orders/user/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: The ID of the user to retrieve orders for
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       url: 'http://localhost:8081/swagger-ui/index.html#/Order%20Controller/getOrdersByUserId'
 *     tags:
 *      - Orders
 */
router.get('/user/:userId', orderService.getOrdersByUserId);
module.exports = router;