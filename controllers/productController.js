const express = require('express');
const productService = require('../services/productService');
const adminRoutes = require('../middleware/adminRoutes');
const userRoutes = require('../middleware/userRoutes');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     summary: Create a new product with the provided details
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *             required:
 *               - productName
 *               - description
 *               - price
 *     responses:
 *       201:
 *         description: Successful creation response
 *     externalDocs:
 *       url: 'http://localhost:8080/swagger-ui/index.html#/Product%20Controller/createProduct'
 *     tags:
 *      - Products
 */
router.post('/',verifyToken,adminRoutes, productService.createProduct);
/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     summary: Get all the products details
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       url: 'http://localhost:8080/swagger-ui/index.html#/Product%20Controller/getAllProduct'
 *     tags:
 *      - Products
 */
router.get('/',productService.getAllProducts);
/**
 * @openapi
 * /api/v1/products/{productId}:
 *   get:
 *     summary: Retrieve a specific product by id
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *          type: string
 *         required: true
 *         description: The Id of the Product to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       url: 'http://localhost:8080/swagger-ui/index.html#/Product%20Controller/getProduct'
 *     tags:
 *      - Products
 */
router.get('/:productId',verifyToken,userRoutes, productService.getProductById);
/**
 * @openapi
 * /api/v1/products/{productId}:
 *   put:
 *     summary: Update a specific product by its ID with the provided details
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *             required:
 *               - productName
 *               - description
 *               - price
 *               - status
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *          type: string
 *         required: true
 *         description: The Id of the Product to update
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       url: 'http://localhost:8080/swagger-ui/index.html#/Product%20Controller/updateProduct'
 *     tags:
 *      - Products
 */
router.put('/:productId',verifyToken, adminRoutes, productService.updateProduct);
/**
 * @openapi
 * /api/v1/products/{productId}:
 *   delete:
 *     summary: Delete a product by its Id
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *          type: string
 *         required: true
 *         description: The Id of the Product to delete
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       url: 'http://localhost:8080/swagger-ui/index.html#/Product%20Controller/deleteProduct'
 *     tags:
 *      - Products
 */
router.delete('/:productId',verifyToken,adminRoutes, productService.deleteProduct);

module.exports = router;