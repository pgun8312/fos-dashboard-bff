const express = require('express');
const userService = require('../services/userService')
const router = express.Router();

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     summary: Create a new user with the provided details
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - userName
 *               - name
 *               - email
 *               - phone
 *     responses:
 *       201:
 *         description: Successful creation response
 *     externalDocs:
 *       url: 'http://localhost:8082/swagger-ui/index.html#/user-controller/createUser'
 *     tags:
 *      - Users
 */
router.post('/', userService.createUser);
/**
 * not implemented backend end point
 */
router.get('/', userService.getAllUsers);
/**
 * @openapi
 * /api/v1/users/{userSub}:
 *   get:
 *     summary: Retrieve a specific user by User Sub ID
 *     parameters:
 *       - in: path
 *         name: userSub
 *         schema:
 *           type: String
 *         description: The User sub of the User to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       url: 'http://localhost:8082/swagger-ui/index.html#/user-controller/getUserBy'
 *     tags:
 *      - Users
 */
router.get('/:userSub', userService.getUserByUserSub);
/**
 * @openapi
 * /api/v1/users/{userId}:
 *   put:
 *     summary: Update a specific user by ID with the provided details
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - userName
 *               - name
 *               - email
 *               - phone
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the User to update
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       url: 'http://localhost:8082/swagger-ui/index.html#/user-controller/updateUser'
 *     tags:
 *      - Users
 */
router.put('/:userId', userService.updateUser);
/**
 * @openapi
 * /api/v1/users/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the User to delete
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       url: 'http://localhost:8082/swagger-ui/index.html#/user-controller/deleteUser'
 *     tags:
 *      - Users
 */
router.delete('/:userId', userService.deleteUser);
/**
 * @openapi
 * /api/v1/users/user-profile:
 *   post:
 *     summary: Create a new user profile with the provided details
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deliveryAddress:
 *                 type: string
 *               dietaryPreferences:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *               userId:
 *                 type: number
 *             required:
 *               - deliveryAddress
 *               - userId
 *     responses:
 *       201:
 *         description: Successful creation response
 *     externalDocs:
 *       url: 'http://localhost:8082/swagger-ui/index.html#/user-controller/createUserProfile'
 *     tags:
 *      - Users
 */
router.post('/user-profile', userService.createUserProfile);

/**
 * @openapi
 * /api/v1/users/user-profile/{userId}:
 *   get:
 *     summary: Retrieve a user profile by User ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the User whose profile to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       url: 'http://localhost:8082/swagger-ui/index.html#/user-controller/getUserProfileByUserId'
 *     tags:
 *      - Users
 */
router.get('/user-profile/:userId',userService.getUserProfileById);

module.exports = router;